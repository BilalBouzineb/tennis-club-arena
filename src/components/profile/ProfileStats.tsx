
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileStatsProps {
  wins: number;
  losses: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ wins, losses }) => {
  const total = wins + losses;
  const winPercentage = total > 0 ? Math.round((wins / total) * 100) : 0;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Win Rate</span>
        <span className="text-sm font-medium">{winPercentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded overflow-hidden">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${winPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <span className="font-medium">{wins}</span> <span className="text-muted-foreground">Wins</span>
        </div>
        <div>
          <span className="font-medium">{losses}</span> <span className="text-muted-foreground">Losses</span>
        </div>
      </div>
    </div>
  );
};
