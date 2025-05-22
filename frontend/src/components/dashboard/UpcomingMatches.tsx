
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export const UpcomingMatches: React.FC = () => {
  // Mock data for upcoming matches
  const matches = [
    {
      id: 1,
      opponent: "Michael Roberts",
      date: "May 25, 2025",
      time: "2:00 PM",
      court: "Court 3",
      type: "Singles"
    },
    {
      id: 2,
      opponent: "Sarah Johnson & David Chen",
      date: "May 28, 2025",
      time: "4:30 PM",
      court: "Court 1",
      type: "Doubles"
    },
    {
      id: 3,
      opponent: "Emma Williams",
      date: "June 2, 2025",
      time: "10:00 AM",
      court: "Court 2",
      type: "Singles"
    }
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Opponent</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Court</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow key={match.id}>
            <TableCell>
              <div className="font-medium">{match.date}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3 w-3" /> {match.time}
              </div>
            </TableCell>
            <TableCell>{match.opponent}</TableCell>
            <TableCell>{match.type}</TableCell>
            <TableCell>{match.court}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                <Button size="sm">View</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
