"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Medal, Award, Crown, Star } from "lucide-react";
import { LeaderboardEntry } from "@/lib/gamification";

interface LeaderboardProps {
  currentUser?: {
    username: string;
    totalPoints: number;
    level: number;
    completedExercises: number;
    streak: number;
  };
}

export function Leaderboard({ currentUser }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const updateLeaderboard = useCallback((user: typeof currentUser) => {
    if (!user) return;

    const newEntry: LeaderboardEntry = {
      username: user.username,
      totalPoints: user.totalPoints,
      level: user.level,
      completedExercises: user.completedExercises,
      streak: user.streak,
      lastActive: new Date().toISOString()
    };

    setLeaderboard(prev => {
      const filtered = prev.filter(entry => entry.username !== user.username);
      const updated = [...filtered, newEntry].sort((a, b) => b.totalPoints - a.totalPoints);
      const top10 = updated.slice(0, 10);

      // Save to localStorage
      try {
        localStorage.setItem('html-tables-leaderboard', JSON.stringify(top10));
      } catch (error) {
        console.error('Failed to save leaderboard:', error);
      }

      return top10;
    });
  }, []);

  // Load leaderboard from localStorage
  useEffect(() => {
    const loadLeaderboard = () => {
      try {
        const saved = localStorage.getItem('html-tables-leaderboard');
        if (saved) {
          const parsed = JSON.parse(saved);
          setLeaderboard(parsed);
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      }
    };

    loadLeaderboard();

    // Update leaderboard when current user changes
    if (currentUser) {
      updateLeaderboard(currentUser);
    }
  }, [currentUser, updateLeaderboard]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCurrentUserRank = () => {
    if (!currentUser) return null;
    const rank = leaderboard.findIndex(entry => entry.username === currentUser.username) + 1;
    return rank > 0 ? rank : null;
  };

  const currentUserRank = getCurrentUserRank();

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
            {currentUserRank && (
              <Badge variant="secondary" className="ml-2">
                #{currentUserRank}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Leaderboard</span>
            </DialogTitle>
            <DialogDescription>
              See how you rank against other learners. Complete more exercises to climb the leaderboard!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {leaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No scores yet. Be the first to complete some exercises!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = currentUser?.username === entry.username;

                  return (
                    <Card
                      key={entry.username}
                      className={`p-4 ${isCurrentUser ? 'border-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(rank)}
                            <span className="font-bold text-lg">#{rank}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{entry.username}</span>
                              {isCurrentUser && (
                                <Badge variant="default" className="text-xs">You</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Level {entry.level}</span>
                              <span>{entry.completedExercises} exercises</span>
                              <span className="flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                {entry.streak} streak
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {entry.totalPoints.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {currentUser && !currentUserRank && leaderboard.length > 0 && (
              <Card className="p-4 border-dashed">
                <div className="text-center text-gray-500">
                  <p>You haven&apos;t earned enough points to appear on the leaderboard yet.</p>
                  <p className="text-sm mt-1">Complete more exercises to climb the ranks!</p>
                </div>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}