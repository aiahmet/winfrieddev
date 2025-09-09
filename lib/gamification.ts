// Gamification types and utilities for HTML Tables Learning App

export interface UserProfile {
  username: string;
  avatar?: string;
  level: number;
  totalPoints: number;
  streak: number;
  joinDate: string;
}

export interface ExerciseScore {
  exerciseId: number;
  points: number;
  attempts: number;
  timeSpent: number; // in seconds
  completedAt: string;
  hintsUsed: number;
}

export interface LeaderboardEntry {
  username: string;
  totalPoints: number;
  level: number;
  completedExercises: number;
  streak: number;
  lastActive: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  exerciseIds: number[];
  targetPoints: number;
  rewardPoints: number;
  date: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Reward {
  id: string;
  type: 'theme' | 'badge' | 'title' | 'feature';
  name: string;
  description: string;
  unlockedAt?: string;
  isActive?: boolean;
}

export interface GameState {
  userProfile: UserProfile;
  scores: ExerciseScore[];
  achievements: Achievement[];
  rewards: Reward[];
  dailyChallenges: DailyChallenge[];
  lastPlayedDate: string;
}

// Scoring constants
export const SCORING = {
  BASE_POINTS: 100,
  ATTEMPT_BONUS: 50, // Bonus for fewer attempts
  SPEED_BONUS: 25, // Bonus for completing quickly
  STREAK_BONUS: 10, // Bonus for daily streaks
  HINT_PENALTY: 10, // Points deducted for using hints
  PERFECT_BONUS: 50, // Bonus for completing on first try without hints
} as const;

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0, 200, 500, 1000, 1800, 3000, 5000, 8000, 12000, 18000
];

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-exercise',
    title: 'First Steps',
    description: 'Complete your first exercise',
    icon: '🎯'
  },
  {
    id: 'perfect-score',
    title: 'Perfectionist',
    description: 'Complete an exercise on first try without hints',
    icon: '⭐'
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete an exercise in under 30 seconds',
    icon: '⚡'
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥'
  },
  {
    id: 'table-champion',
    title: 'Table Champion',
    description: 'Complete all exercises',
    icon: '🏆'
  },
  {
    id: 'hint-minimalist',
    title: 'Hint Minimalist',
    description: 'Complete 5 exercises without using hints',
    icon: '🧠'
  }
];

// Reward definitions
export const REWARDS: Reward[] = [
  {
    id: 'dark-theme',
    type: 'theme',
    name: 'Dark Theme',
    description: 'Unlock the dark theme for the app'
  },
  {
    id: 'rainbow-theme',
    type: 'theme',
    name: 'Rainbow Theme',
    description: 'Unlock the colorful rainbow theme'
  },
  {
    id: 'expert-badge',
    type: 'badge',
    name: 'Expert Badge',
    description: 'Show off your HTML table expertise'
  },
  {
    id: 'speedster-title',
    type: 'title',
    name: 'Speedster',
    description: 'Earn the Speedster title'
  }
];

// Utility functions
export function calculateExercisePoints(
  attempts: number,
  timeSpent: number,
  hintsUsed: number,
  isFirstTry: boolean
): number {
  let points = SCORING.BASE_POINTS;

  // Attempt bonus (more points for fewer attempts)
  if (attempts === 1) {
    points += SCORING.ATTEMPT_BONUS;
  } else if (attempts <= 3) {
    points += Math.floor(SCORING.ATTEMPT_BONUS / 2);
  }

  // Speed bonus (faster completion = more points)
  if (timeSpent < 60) { // Under 1 minute
    points += SCORING.SPEED_BONUS;
  } else if (timeSpent < 120) { // Under 2 minutes
    points += Math.floor(SCORING.SPEED_BONUS / 2);
  }

  // Hint penalty
  points -= hintsUsed * SCORING.HINT_PENALTY;

  // Perfect bonus
  if (isFirstTry && hintsUsed === 0) {
    points += SCORING.PERFECT_BONUS;
  }

  return Math.max(0, points);
}

export function getLevelFromPoints(totalPoints: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getPointsToNextLevel(currentPoints: number): number {
  const currentLevel = getLevelFromPoints(currentPoints);
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return 0; // Max level reached
  }
  return LEVEL_THRESHOLDS[currentLevel] - currentPoints;
}

export function generateDailyChallenge(date: string): DailyChallenge {
  const dayOfMonth = new Date(date).getDate();
  const exerciseIds = [
    ((dayOfMonth - 1) % 4) + 1,
    (dayOfMonth % 4) + 1,
    ((dayOfMonth + 1) % 4) + 1
  ];

  return {
    id: `daily-${date}`,
    title: 'Daily Challenge',
    description: `Complete exercises ${exerciseIds.join(', ')} with high scores!`,
    exerciseIds,
    targetPoints: 250,
    rewardPoints: 100,
    date,
    completed: false
  };
}

export function checkAndUnlockRewards(
  achievements: Achievement[],
  totalPoints: number,
  currentRewards: Reward[]
): Reward[] {
  const updatedRewards = [...currentRewards];

  updatedRewards.forEach(reward => {
    if (!reward.unlockedAt) {
      let shouldUnlock = false;

      switch (reward.id) {
        case 'dark-theme':
          shouldUnlock = totalPoints >= 500;
          break;
        case 'rainbow-theme':
          shouldUnlock = totalPoints >= 1000;
          break;
        case 'expert-badge':
          shouldUnlock = achievements.some(a => a.id === 'table-champion' && a.unlockedAt);
          break;
        case 'speedster-title':
          shouldUnlock = achievements.some(a => a.id === 'speed-demon' && a.unlockedAt);
          break;
      }

      if (shouldUnlock) {
        reward.unlockedAt = new Date().toISOString();
      }
    }
  });

  return updatedRewards;
}

// Storage utilities
export function saveGameState(gameState: GameState): void {
  try {
    localStorage.setItem('html-tables-gamification', JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function loadGameState(): GameState | null {
  try {
    const saved = localStorage.getItem('html-tables-gamification');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

export function initializeGameState(username: string): GameState {
  const now = new Date().toISOString();
  return {
    userProfile: {
      username,
      level: 1,
      totalPoints: 0,
      streak: 0,
      joinDate: now
    },
    scores: [],
    achievements: ACHIEVEMENTS.map(a => ({ ...a })),
    rewards: REWARDS.map(r => ({ ...r })),
    dailyChallenges: [],
    lastPlayedDate: now
  };
}