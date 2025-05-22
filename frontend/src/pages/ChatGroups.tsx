
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { GroupCard } from "@/components/chat/GroupCard";
import { useToast } from "@/hooks/use-toast";

const ChatGroups = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mock data for chat groups
  const chatGroups = [
    {
      id: 1,
      name: "Club Announcements",
      description: "Official club updates and news",
      members: 125,
      unread: 3,
      lastMessage: "Court 3 will be closed for maintenance tomorrow.",
      lastMessageTime: "2h ago",
      isOfficial: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Doubles Partners",
      description: "Find partners for doubles matches",
      members: 48,
      unread: 0,
      lastMessage: "Anyone free for a match this Saturday afternoon?",
      lastMessageTime: "4h ago",
      isOfficial: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Tournament Discussion",
      description: "Talk about upcoming and past tournaments",
      members: 72,
      unread: 5,
      lastMessage: "Registration for summer tournament closes tomorrow!",
      lastMessageTime: "1h ago",
      isOfficial: true,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Beginners Group",
      description: "Support and tips for new players",
      members: 35,
      unread: 0,
      lastMessage: "Thanks for the serving tips, they really helped!",
      lastMessageTime: "1d ago",
      isOfficial: false,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Training Sessions",
      description: "Coordinate and discuss training",
      members: 28,
      unread: 2,
      lastMessage: "Who's joining the footwork drill this Thursday?",
      lastMessageTime: "3h ago",
      isOfficial: false,
      image: "/placeholder.svg"
    },
  ];

  const createNewGroup = () => {
    toast({
      title: "Create a new group",
      description: "This feature will be available soon.",
    });
  };

  const filteredGroups = searchQuery
    ? chatGroups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatGroups;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Chat Groups</h1>
          <p className="text-muted-foreground">Connect with other club members</p>
        </div>
        <Button onClick={createNewGroup}>
          <Plus className="mr-2 h-4 w-4" /> New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Find Groups</CardTitle>
              <CardDescription>Search or browse chat groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> All Groups
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> My Groups
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
              <CardDescription>Your recent conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">CA</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Club Announcements</p>
                  <p className="text-xs text-muted-foreground truncate">Court 3 will be closed...</p>
                </div>
                <Badge className="ml-2">3</Badge>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">TD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Tournament Discussion</p>
                  <p className="text-xs text-muted-foreground truncate">Registration for summer tournament...</p>
                </div>
                <Badge className="ml-2">5</Badge>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-accent text-accent-foreground">TS</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Training Sessions</p>
                  <p className="text-xs text-muted-foreground truncate">Who's joining the footwork drill...</p>
                </div>
                <Badge className="ml-2">2</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Manage Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">
            {searchQuery ? `Search Results: "${searchQuery}"` : "Available Groups"}
          </h2>
          
          {filteredGroups.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground mb-4">
                Try a different search term or create a new group
              </p>
              <Button onClick={createNewGroup}>Create New Group</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGroups.map((group) => (
                <Link to={`/chat/${group.id}`} key={group.id}>
                  <GroupCard group={group} />
                </Link>
              ))}
            </div>
          )}
          
          {!searchQuery && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Create Your Own Group</CardTitle>
                <CardDescription>
                  Start a new conversation with club members who share your interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Creating a group is a great way to organize matches, discuss tennis topics, or
                  simply connect with other players at the club.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={createNewGroup} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Create New Group
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatGroups;
