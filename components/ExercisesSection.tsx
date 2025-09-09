"use client";

import { useState, useEffect } from "react";
import { exercises } from "@/app/exercises-data";
import { ExerciseChallenge } from "@/components/ExerciseChallenge";
import {
  GameState,
  UserProfile,
  ExerciseScore,
  calculateExercisePoints,
  getLevelFromPoints,
  saveGameState,
  loadGameState,
  initializeGameState,
  ACHIEVEMENTS
} from "@/lib/gamification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressData {
  completedExercises: number[];
  attempts: { [key: number]: number };
  lastAttempt: { [key: number]: string };
  achievements: string[];
}

export function ExercisesSection() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [progressData, setProgressData] = useState<ProgressData>({
    completedExercises: [],
    attempts: {},
    lastAttempt: {},
    achievements: []
  });
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [username, setUsername] = useState("");
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [lastScore, setLastScore] = useState<ExerciseScore | null>(null);

  // Initialize gamification on component mount
  useEffect(() => {
    const savedGameState = loadGameState();
    if (savedGameState) {
      setGameState(savedGameState);
      setUsername(savedGameState.userProfile.username);
    } else {
      setShowUsernameDialog(true);
    }
  }, []);

  // Load progress from localStorage on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('html-tables-progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        const lastAttempt: { [key: string]: string } = {};
        Object.keys(parsed.lastAttempt || {}).forEach(key => {
          lastAttempt[key] = parsed.lastAttempt[key];
        });
        setProgressData({
          ...parsed,
          lastAttempt
        });
      }
    } catch (e) {
      console.error('Failed to load progress from storage', e);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('html-tables-progress', JSON.stringify(progressData));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progressData]);

  // Save game state whenever it changes
  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      const newGameState = initializeGameState(username.trim());
      setGameState(newGameState);
      setShowUsernameDialog(false);
    }
  };

  const startExercise = () => {
    setExerciseStartTime(Date.now());
    setHintsUsed(0);
  };

  const currentExercise = exercises[currentExerciseIndex];
  const isCompleted = progressData.completedExercises.includes(currentExercise.id);

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      startExercise();
    }
  };

  const handlePrev = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      startExercise();
    }
  };

  const handleComplete = () => {
    const exerciseId = currentExercise.id;
    if (!progressData.completedExercises.includes(exerciseId) && gameState && exerciseStartTime) {
      const timeSpent = Math.floor((Date.now() - exerciseStartTime) / 1000);
      const attempts = (progressData.attempts[exerciseId] || 0) + 1;
      const isFirstTry = attempts === 1;

      // Calculate points
      const points = calculateExercisePoints(attempts, timeSpent, hintsUsed, isFirstTry);

      // Create exercise score
      const exerciseScore: ExerciseScore = {
        exerciseId,
        points,
        attempts,
        timeSpent,
        completedAt: new Date().toISOString(),
        hintsUsed
      };

      // Update game state
      const updatedScores = [...gameState.scores];
      const existingScoreIndex = updatedScores.findIndex(s => s.exerciseId === exerciseId);

      if (existingScoreIndex >= 0) {
        // Update existing score if better
        if (points > updatedScores[existingScoreIndex].points) {
          updatedScores[existingScoreIndex] = exerciseScore;
        }
      } else {
        updatedScores.push(exerciseScore);
      }

      // Update user profile
      const totalPoints = updatedScores.reduce((sum, score) => sum + score.points, 0);
      const level = getLevelFromPoints(totalPoints);

      const updatedProfile: UserProfile = {
        ...gameState.userProfile,
        totalPoints,
        level
      };

      // Check for achievements
      const updatedAchievements = [...gameState.achievements];
      ACHIEVEMENTS.forEach(achievement => {
        if (!updatedAchievements.find(a => a.id === achievement.id)) {
          let unlocked = false;

          switch (achievement.id) {
            case 'first-exercise':
              unlocked = updatedScores.length >= 1;
              break;
            case 'perfect-score':
              unlocked = updatedScores.some(s => s.attempts === 1 && s.hintsUsed === 0);
              break;
            case 'speed-demon':
              unlocked = updatedScores.some(s => s.timeSpent < 60);
              break;
            case 'table-champion':
              unlocked = updatedScores.length === exercises.length;
              break;
            case 'hint-minimalist':
              unlocked = updatedScores.filter(s => s.hintsUsed === 0).length >= 5;
              break;
          }

          if (unlocked) {
            updatedAchievements.push({
              ...achievement,
              unlockedAt: new Date().toISOString()
            });
          }
        }
      });

      // Update progress data for backward compatibility
      const currentAttempts = progressData.attempts[exerciseId] || 0;
      const newAttempts = { ...progressData.attempts, [exerciseId]: currentAttempts + 1 };
      const newLastAttempt = { ...progressData.lastAttempt, [exerciseId]: new Date().toISOString() };
      const newCompleted = [...progressData.completedExercises, exerciseId];

      // Legacy achievements
      const newAchievements = [...progressData.achievements];
      if (newCompleted.length >= 1 && !newAchievements.includes("Erste Schritte")) {
        newAchievements.push("Erste Schritte");
      }
      if (newCompleted.length >= 2 && !newAchievements.includes("Tabellenbauer")) {
        newAchievements.push("Tabellenbauer");
      }
      if (newCompleted.length >= 3 && !newAchievements.includes("HTML-Meister")) {
        newAchievements.push("HTML-Meister");
      }
      if (newCompleted.length === exercises.length && !newAchievements.includes("Tabellen-Champion")) {
        newAchievements.push("Tabellen-Champion");
      }

      setProgressData({
        completedExercises: newCompleted,
        attempts: newAttempts,
        lastAttempt: newLastAttempt,
        achievements: newAchievements
      });

      setGameState({
        ...gameState,
        userProfile: updatedProfile,
        scores: updatedScores,
        achievements: updatedAchievements,
        lastPlayedDate: new Date().toISOString()
      });

      setLastScore(exerciseScore);
      setShowScoreDialog(true);
    }
  };

  const progressPercentage = Math.round((progressData.completedExercises.length / exercises.length) * 100);

  // Initialize exercise timer when exercise changes
  useEffect(() => {
    startExercise();
  }, [currentExerciseIndex]);

  if (!gameState) {
    return (
      <Dialog open={showUsernameDialog} onOpenChange={setShowUsernameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Willkommen beim HTML Tabellen Lernen!</DialogTitle>
            <DialogDescription>
              Gib deinen Benutzernamen ein, um mit dem Lernen zu beginnen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Gib deinen Benutzernamen ein, um zu starten:</p>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Dein Benutzername"
              onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
            />
            <Button onClick={handleUsernameSubmit} disabled={!username.trim()}>
              Starten
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <section role="region" aria-labelledby="exercises-heading" className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-[var(--space-4)] py-[var(--space-6)] sm:py-[var(--space-7)] space-y-[var(--space-2)]">
        {/* Simple Header */}
        <div className="text-center space-y-[var(--space-2)]">
          <h2 id="exercises-heading" className="text-3xl md:text-4xl font-bold text-[var(--text)] leading-[var(--line-height-tight)]">Übungen</h2>
          <p className="text-muted-foreground">
            {progressData.completedExercises.length}/{exercises.length} Übungen abgeschlossen
          </p>
        </div>

        {/* Simple Progress Bar */}
        <div
          className="w-full bg-muted rounded-full h-3"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fortschritt Übungen"
        >
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Exercise Navigation */}
        <div role="group" aria-label="Übungen auswählen">
          <ul role="list" className="flex justify-center mt-[var(--space-3)] gap-[var(--space-2)]">
            {exercises.map((_, index) => (
              <li role="listitem" key={index}>
                <button
                  onClick={() => setCurrentExerciseIndex(index)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    index === currentExerciseIndex
                      ? 'bg-primary text-primary-foreground'
                      : progressData.completedExercises.includes(exercises[index].id)
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  aria-label={`Übung ${index + 1}${progressData.completedExercises.includes(exercises[index].id) ? ' (abgeschlossen)' : ''}`}
                  aria-current={index === currentExerciseIndex ? "page" : undefined}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Exercise Challenge */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-[var(--space-5)] shadow-[var(--shadow-sm)]">
          <ExerciseChallenge
            exercise={currentExercise}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentExerciseIndex === 0}
            isLast={currentExerciseIndex === exercises.length - 1}
            onComplete={handleComplete}
            isCompleted={isCompleted}
          />
        </div>
      </div>
      
      <AnimatePresence>
        {/* Score Dialog with Animations */}
        {showScoreDialog && (
          <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center space-x-2 text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Übung abgeschlossen!
                  </motion.span>
                </DialogTitle>
                <DialogDescription className="text-center">
                  Herzlichen Glückwunsch! Du hast die Übung erfolgreich abgeschlossen.
                </DialogDescription>
              </DialogHeader>

              {lastScore && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Celebration animation */}
                  <motion.div
                    className="text-center py-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="text-4xl font-bold text-green-600 mb-2"
                      animate={{
                        scale: [1, 1.2, 1],
                        color: ["#16A34A", "#22C55E", "#16A34A"]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      +{lastScore.points} Punkte
                    </motion.div>
                    <motion.div
                      className="text-lg text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Großartige Arbeit! 🎉
                    </motion.div>
                  </motion.div>

                  {/* Stats grid with staggered animation */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.8
                        }
                      }
                    }}
                  >
                    {[
                      { label: "Versuche", value: lastScore.attempts },
                      { label: "Zeit", value: `${Math.floor(lastScore.timeSpent / 60)}:${(lastScore.timeSpent % 60).toString().padStart(2, '0')}` },
                      { label: "Hinweise", value: lastScore.hintsUsed },
                      { label: "Abgeschlossen", value: new Date(lastScore.completedAt).toLocaleDateString('de-DE') }
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {stat.label}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Continue button with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Button
                      onClick={() => setShowScoreDialog(false)}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                    >
                      Weiter lernen
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
    </section>
  );
}