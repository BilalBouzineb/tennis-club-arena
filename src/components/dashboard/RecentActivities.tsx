import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Calendar, Rocket } from "lucide-react";

export const RecentActivities: React.FC = () => {
  // Mock data for activities
  const activities = [
    {
      id: 1,
      type: "match",
      description: "You won against Michael Roberts",
      date: "Yesterday",
      icon: <Trophy className="h-4 w-4" />
    },
    {
      id: 2,
      type: "booking",
      description: "You booked Court 2 for May 28",
      date: "2 days ago",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: 3,
      type: "lesson",
      description: "You completed a lesson with Coach Sarah",
      date: "3 days ago",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: 4,
      type: "tournament",
      description: "You registered for Summer Open Tournament",
      date: "1 week ago",
      icon: <Trophy className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className={`mr-4 p-2 rounded-full ${
            activity.type === "match" ? "bg-accent text-accent-foreground" : 
            activity.type === "booking" ? "bg-primary text-primary-foreground" :
            activity.type === "lesson" ? "bg-secondary text-secondary-foreground" :
            "bg-muted text-muted-foreground"
          }`}>
            {activity.icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.date}</p>
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-medium mb-4">Club Activity</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe ranked up to Intermediate level</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Sarah Williams won the Spring Tournament</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
