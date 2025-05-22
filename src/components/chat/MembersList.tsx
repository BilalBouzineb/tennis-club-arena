
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MembersListProps {
  groupId: number;
}

export const MembersList: React.FC<MembersListProps> = ({ groupId }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Mock members data
  const members = [
    {
      id: 1,
      name: "Sarah Williams",
      role: "Admin",
      status: "online",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "John Smith",
      role: "Moderator",
      status: "online",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Member",
      status: "offline",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Member",
      status: "online",
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      name: "David Rodriguez",
      role: "Member",
      status: "offline",
      avatar: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Alex Johnson",
      role: "Member",
      status: "online",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredMembers = searchQuery
    ? members.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-sm">Group Admins & Moderators</h3>
        {filteredMembers
          .filter(member => member.role === "Admin" || member.role === "Moderator")
          .map(member => (
            <div key={member.id} className="flex items-center p-2 hover:bg-muted rounded-md">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <div className={`h-2 w-2 rounded-full ${member.status === 'online' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
        ))}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">Members</h3>
          <Badge variant="outline" className="text-xs">
            {filteredMembers.filter(member => member.role === "Member").length} members
          </Badge>
        </div>
        {filteredMembers
          .filter(member => member.role === "Member")
          .map(member => (
            <div key={member.id} className="flex items-center p-2 hover:bg-muted rounded-md">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
              </div>
              <div className={`h-2 w-2 rounded-full ${member.status === 'online' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
        ))}
      </div>
      
      {filteredMembers.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No members found</p>
        </div>
      )}
    </div>
  );
};
