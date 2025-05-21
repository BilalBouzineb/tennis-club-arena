
import React from "react";
import { Badge } from "@/components/ui/badge";

interface GroupInfoProps {
  group: {
    id: number;
    name: string;
    description: string;
    members: number;
    isOfficial: boolean;
    image: string;
    created: string;
    rules: string;
  };
}

export const GroupInfo: React.FC<GroupInfoProps> = ({ group }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">About this group</h3>
        <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
      </div>
      
      <div className="pt-2 border-t">
        <h3 className="text-sm font-medium">Group details</h3>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Members</p>
            <p className="text-sm font-medium">{group.members}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="text-sm font-medium">{group.created}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Group type</p>
            <Badge variant={group.isOfficial ? "secondary" : "outline"}>
              {group.isOfficial ? "Official" : "Community"}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <h3 className="text-sm font-medium">Group rules</h3>
        <p className="text-sm text-muted-foreground mt-1">{group.rules}</p>
      </div>
    </div>
  );
};
