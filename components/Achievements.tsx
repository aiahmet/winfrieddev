"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Achievement, Reward } from "@/lib/gamification";
import { Trophy, Star, Lock, Unlock, Gift } from "lucide-react";

interface AchievementsProps {
  achievements: Achievement[];
  rewards: Reward[];
  totalPoints: number;
}

export function Achievements({ achievements, rewards, totalPoints }: AchievementsProps) {
  const [showDialog, setShowDialog] = useState(false);

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const unlockedRewards = rewards.filter(r => r.unlockedAt);
  const lockedRewards = rewards.filter(r => !r.unlockedAt);

  const getAchievementIcon = (achievement: Achievement) => {
    return achievement.icon || "🏆";
  };

  const getRewardIcon = (reward: Reward) => {
    switch (reward.type) {
      case 'theme':
        return "🎨";
      case 'badge':
        return "🏅";
      case 'title':
        return "👑";
      case 'feature':
        return "⚡";
      default:
        return "🎁";
    }
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
            <Badge variant="secondary" className="ml-2">
              {unlockedAchievements.length}/{achievements.length}
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Achievements & Rewards</span>
            </DialogTitle>
            <DialogDescription>
              View your unlocked achievements and available rewards. Keep learning to unlock more!
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-4">
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Unlock className="h-5 w-5 mr-2 text-green-500" />
                    Unlocked ({unlockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unlockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="p-4 border-green-200 bg-green-50">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{getAchievementIcon(achievement)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            {achievement.unlockedAt && (
                              <p className="text-xs text-green-600 mt-1">
                                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Achievements */}
              {lockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-gray-400" />
                    Locked ({lockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="p-4 border-gray-200 bg-gray-50 opacity-75">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl grayscale">🏆</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-500">{achievement.title}</h4>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">Not yet unlocked</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              {/* Unlocked Rewards */}
              {unlockedRewards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-purple-500" />
                    Unlocked ({unlockedRewards.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unlockedRewards.map((reward) => (
                      <Card key={reward.id} className="p-4 border-purple-200 bg-purple-50">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{getRewardIcon(reward)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{reward.name}</h4>
                            <p className="text-sm text-gray-600">{reward.description}</p>
                            <Badge variant="secondary" className="mt-1">
                              {reward.type}
                            </Badge>
                            {reward.unlockedAt && (
                              <p className="text-xs text-purple-600 mt-1">
                                Unlocked {new Date(reward.unlockedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Rewards */}
              {lockedRewards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-gray-400" />
                    Available ({lockedRewards.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lockedRewards.map((reward) => (
                      <Card key={reward.id} className="p-4 border-gray-200 bg-gray-50">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl grayscale">🎁</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{reward.name}</h4>
                            <p className="text-sm text-gray-600">{reward.description}</p>
                            <Badge variant="outline" className="mt-1">
                              {reward.type}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Points Summary */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-xl font-bold">{totalPoints.toLocaleString()} Points</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Keep learning to unlock more achievements and rewards!
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}