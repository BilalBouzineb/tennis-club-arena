
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface AnnouncementCardProps {
  title: string;
  date: string;
  urgent?: boolean;
  children: React.ReactNode;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  date,
  urgent = false,
  children
}) => {
  return (
    <Card className={urgent ? "border-accent" : ""}>
      <CardHeader className={urgent ? "bg-accent/10 pb-2" : "pb-2"}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {urgent && (
            <AlertTriangle className="h-5 w-5 text-accent" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
};
