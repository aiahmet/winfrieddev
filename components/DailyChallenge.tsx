"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DailyChallenge as DailyChallengeType, generateDailyChallenge } from "@/lib/gamification";
import { Target, CheckCircle, Clock, Trophy } from "lucide-react";

interface DailyChallengeProps {
  currentChallenges: DailyChallengeType[];
  onChallengeUpdate: (challenges: DailyChallengeType[]) => void;
  completedExercises: number[];
  scores: { exerciseId: number; points: number }[];
}

export function DailyChallenge({
  currentChallenges,
  onChallengeUpdate,
  completedExercises,
  scores
}: DailyChallengeProps) {
  const [todayChallenge, setTodayChallenge] = useState<DailyChallengeType | null>(null);

  // Generate or load today&apos;s challenge
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const existingChallenge = currentChallenges.find(c => c.date === today);

    if (existingChallenge) {
      setTodayChallenge(existingChallenge);
    } else {
      const newChallenge = generateDailyChallenge(today);
      setTodayChallenge(newChallenge);
      onChallengeUpdate([...currentChallenges, newChallenge]);
    }
  }, [currentChallenges, onChallengeUpdate]);

  // Check if challenge is completed
  useEffect(() => {
    if (!todayChallenge) return;

    const challengeScores = todayChallenge.exerciseIds.map(exerciseId => {
      const score = scores.find(s => s.exerciseId === exerciseId);
      return score ? score.points : 0;
    });

    const totalPoints = challengeScores.reduce((sum, points) => sum + points, 0);
    const isCompleted = totalPoints >= todayChallenge.targetPoints;

    if (isCompleted && !todayChallenge.completed) {
      const updatedChallenge = { ...todayChallenge, completed: true };
      setTodayChallenge(updatedChallenge);

      const updatedChallenges = currentChallenges.map(c =>
        c.id === todayChallenge.id ? updatedChallenge : c
      );
      onChallengeUpdate(updatedChallenges);
    }
  }, [todayChallenge, scores, currentChallenges, onChallengeUpdate]);

  if (!todayChallenge) {
    return (
      <Card className="p-4">
        <div className="text-center text-gray-500">
          <Clock className="h-8 w-8 mx-auto mb-2" />
          <p>Loading today&apos;s challenge...</p>
        </div>
      </Card>
    );
  }

  const challengeScores = todayChallenge.exerciseIds.map(exerciseId => {
    const score = scores.find(s => s.exerciseId === exerciseId);
    return score ? score.points : 0;
  });

  const totalPoints = challengeScores.reduce((sum, points) => sum + points, 0);
  const progressPercentage = Math.min((totalPoints / todayChallenge.targetPoints) * 100, 100);

  return (
    <Card className={`p-4 ${todayChallenge.completed ? 'border-green-500 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 mr-2" />
            {todayChallenge.title}
          </CardTitle>
          {todayChallenge.completed ? (
            <Badge className="bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              In Progress
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{todayChallenge.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{totalPoints}/{todayChallenge.targetPoints} points</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Exercise targets */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Target Exercises:</h4>
          <div className="grid grid-cols-1 gap-2">
            {todayChallenge.exerciseIds.map((exerciseId, index) => {
              const isCompleted = completedExercises.includes(exerciseId);
              const points = challengeScores[index];

              return (
                <div
                  key={exerciseId}
                  className={`flex items-center justify-between p-2 rounded text-sm ${
                    isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span>Exercise {exerciseId}</span>
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium">{points} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reward */}
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">Reward</span>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            +{todayChallenge.rewardPoints} points
          </Badge>
        </div>

        {todayChallenge.completed && (
          <div className="text-center p-3 bg-green-100 rounded border border-green-300">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-green-800">Challenge Completed!</p>
            <p className="text-xs text-green-600">Great job earning bonus points!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}