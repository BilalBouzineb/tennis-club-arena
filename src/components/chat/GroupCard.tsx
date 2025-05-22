
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    description: string;
    members: number;
    unread: number;
    lastMessage: string;
    lastMessageTime: string;
    isOfficial: boolean;
    image: string;
  };
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Card className="hover:border-primary transition-colors h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={group.image} alt={group.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {group.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center">
              <CardTitle className="text-base">{group.name}</CardTitle>
              {group.isOfficial && (
                <Badge variant="secondary" className="ml-2 text-xs">Official</Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              {group.members} members
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{group.description}</p>
        <div className="flex items-center justify-between border-t pt-2 mt-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{group.lastMessageTime}</span>
            {group.unread > 0 && (
              <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {group.unread}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
