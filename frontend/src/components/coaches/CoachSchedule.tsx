
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CoachScheduleProps {
  coachId: number;
}

export const CoachSchedule: React.FC<CoachScheduleProps> = ({ coachId }) => {
  const { toast } = useToast();
  
  // Mock schedule data
  const schedule = [
    {
      id: 1,
      day: "Monday",
      times: [
        { time: "9:00 AM - 10:00 AM", available: true },
        { time: "10:30 AM - 11:30 AM", available: false },
        { time: "1:00 PM - 2:00 PM", available: true },
        { time: "3:30 PM - 4:30 PM", available: true },
      ]
    },
    {
      id: 2,
      day: "Tuesday",
      times: [
        { time: "9:00 AM - 10:00 AM", available: false },
        { time: "10:30 AM - 11:30 AM", available: true },
        { time: "1:00 PM - 2:00 PM", available: false },
        { time: "3:30 PM - 4:30 PM", available: true },
      ]
    },
    {
      id: 3,
      day: "Wednesday",
      times: [
        { time: "9:00 AM - 10:00 AM", available: true },
        { time: "10:30 AM - 11:30 AM", available: true },
        { time: "1:00 PM - 2:00 PM", available: false },
        { time: "3:30 PM - 4:30 PM", available: false },
      ]
    },
    {
      id: 4,
      day: "Thursday",
      times: [
        { time: "9:00 AM - 10:00 AM", available: false },
        { time: "10:30 AM - 11:30 AM", available: false },
        { time: "1:00 PM - 2:00 PM", available: true },
        { time: "3:30 PM - 4:30 PM", available: true },
      ]
    },
    {
      id: 5,
      day: "Friday",
      times: [
        { time: "9:00 AM - 10:00 AM", available: true },
        { time: "10:30 AM - 11:30 AM", available: true },
        { time: "1:00 PM - 2:00 PM", available: true },
        { time: "3:30 PM - 4:30 PM", available: false },
      ]
    }
  ];

  const bookSession = (day: string, time: string) => {
    toast({
      title: "Session Booked",
      description: `Your session on ${day} at ${time} has been booked.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Weekly Availability</h3>
        <Badge variant="outline">Week of May 22-28, 2025</Badge>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Available Sessions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((day) => (
            <TableRow key={day.id}>
              <TableCell className="font-medium">{day.day}</TableCell>
              <TableCell>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {day.times.map((session, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between border rounded-md p-2"
                    >
                      <span className="text-sm">{session.time}</span>
                      {session.available ? (
                        <Button 
                          size="sm" 
                          onClick={() => bookSession(day.day, session.time)}
                        >
                          Book
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Booked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="text-sm text-muted-foreground">
        Note: All sessions are 60 minutes in duration. Please arrive 10 minutes before your scheduled time.
      </div>
    </div>
  );
};
