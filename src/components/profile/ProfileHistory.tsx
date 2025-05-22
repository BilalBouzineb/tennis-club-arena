
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const ProfileHistory: React.FC = () => {
  // Mock match history data
  const matchHistory = [
    {
      id: 1,
      opponent: "Michael Roberts",
      date: "May 15, 2025",
      result: "win",
      score: "6-4, 7-5"
    },
    {
      id: 2,
      opponent: "Sarah Johnson",
      date: "May 10, 2025",
      result: "loss",
      score: "4-6, 3-6"
    },
    {
      id: 3,
      opponent: "David Chen",
      date: "May 5, 2025",
      result: "win",
      score: "6-2, 6-3"
    },
    {
      id: 4,
      opponent: "Emma Williams",
      date: "April 28, 2025",
      result: "win",
      score: "7-5, 6-4"
    },
    {
      id: 5,
      opponent: "James Thompson",
      date: "April 20, 2025",
      result: "loss",
      score: "6-7, 4-6"
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Recent Matches</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchHistory.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.opponent}</TableCell>
              <TableCell>{match.score}</TableCell>
              <TableCell>
                <Badge 
                  variant={match.result === "win" ? "default" : "outline"}
                  className={match.result === "win" ? "bg-primary" : "text-muted-foreground"}
                >
                  {match.result === "win" ? "Win" : "Loss"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
