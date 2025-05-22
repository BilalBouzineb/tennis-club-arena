
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Send, Info, Users, Settings, ArrowLeft, Paperclip, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { MembersList } from "@/components/chat/MembersList";
import { GroupInfo } from "@/components/chat/GroupInfo";
import { useToast } from "@/hooks/use-toast";

const ChatRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // Mock data for the current chat group
  const group = {
    id: Number(id),
    name: id === "1" ? "Club Announcements" : 
          id === "2" ? "Doubles Partners" : 
          id === "3" ? "Tournament Discussion" :
          id === "4" ? "Beginners Group" : "Training Sessions",
    description: id === "1" ? "Official club updates and news" :
                id === "2" ? "Find partners for doubles matches" :
                id === "3" ? "Talk about upcoming and past tournaments" :
                id === "4" ? "Support and tips for new players" : "Coordinate and discuss training",
    members: id === "1" ? 125 : id === "2" ? 48 : id === "3" ? 72 : id === "4" ? 35 : 28,
    isOfficial: id === "1" || id === "3",
    image: "/placeholder.svg",
    created: "January 15, 2023",
    rules: "Be respectful to all members. No spam or advertising."
  };

  // Mock data for chat messages
  const mockMessages = [
    {
      id: 1,
      sender: "Admin",
      avatar: "/placeholder.svg",
      message: "Welcome to the chat group! Please follow our community guidelines.",
      time: "2 days ago",
      isAdmin: true
    },
    {
      id: 2,
      sender: "John Smith",
      avatar: "/placeholder.svg",
      message: "Hey everyone, does anyone know if Court 3 is available tomorrow afternoon?",
      time: "Yesterday",
      isAdmin: false
    },
    {
      id: 3,
      sender: "Sarah Williams",
      avatar: "/placeholder.svg",
      message: "I think it should be free after 4pm. I just checked the booking system.",
      time: "Yesterday",
      isAdmin: false
    },
    {
      id: 4,
      sender: "Michael Chen",
      avatar: "/placeholder.svg",
      message: "I'm looking for a doubles partner for the weekend tournament. Anyone interested?",
      time: "5 hours ago",
      isAdmin: false
    },
    {
      id: 5,
      sender: "Admin",
      avatar: "/placeholder.svg",
      message: id === "1" ? "Court 3 will be closed for maintenance tomorrow." : 
              id === "2" ? "Remember to update your availability for doubles matches." :
              id === "3" ? "Registration for summer tournament closes tomorrow!" :
              id === "4" ? "New player tips webinar scheduled for Friday." :
                         "Who's joining the footwork drill this Thursday?",
      time: "2 hours ago",
      isAdmin: true
    }
  ];

  useEffect(() => {
    // Simulate loading messages
    setMessages(mockMessages);
    
    // Scroll to bottom of messages
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      avatar: "/placeholder.svg",
      message: message,
      time: "Just now",
      isAdmin: false,
      isSelf: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Scroll to bottom after sending
    setTimeout(() => {
      const messageContainer = document.getElementById('message-container');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-4">
        <Link to="/chat" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Groups
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[calc(100vh-180px)]">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={group.image} alt={group.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {group.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.isOfficial && (
                        <Badge variant="secondary" className="ml-2">Official</Badge>
                      )}
                    </div>
                    <CardDescription>{group.members} members</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-y-auto p-0" id="message-container">
              <div className="p-4 space-y-4">
                {messages.map((msg) => (
                  <ChatMessage 
                    key={msg.id} 
                    message={msg}
                  />
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t">
              <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  onClick={() => toast({
                    title: "Attachment",
                    description: "This feature is coming soon.",
                  })}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Add attachment</span>
                </Button>
                <Input 
                  placeholder="Type your message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="flex-grow"
                />
                <Button 
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => toast({
                    title: "Emoji picker",
                    description: "This feature is coming soon.",
                  })}
                >
                  <Smile className="h-4 w-4" />
                  <span className="sr-only">Add emoji</span>
                </Button>
                <Button type="submit" disabled={!message.trim()}>
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-180px)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Group Details</CardTitle>
              <CardDescription>{group.name}</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </TabsTrigger>
                <TabsTrigger value="members">
                  <Users className="h-4 w-4" />
                  <span className="sr-only">Members</span>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="pt-4 overflow-y-auto h-[calc(100vh-280px)]">
                <TabsContent value="info">
                  <GroupInfo group={group} />
                </TabsContent>
                
                <TabsContent value="members">
                  <MembersList groupId={group.id} />
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm mb-2">Notification Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">All Messages</p>
                          <Badge variant="outline">On</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Mentions Only</p>
                          <Badge variant="outline">Off</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm mb-2">Group Actions</h3>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => toast({
                            title: "Group muted",
                            description: "You will not receive notifications from this group.",
                          })}
                        >
                          Mute Group
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => toast({
                            title: "Report submitted",
                            description: "An administrator will review your report.",
                          })}
                        >
                          Report Group
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-destructive hover:text-destructive"
                          onClick={() => toast({
                            title: "Left group",
                            description: "You have left the group successfully.",
                          })}
                        >
                          Leave Group
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
