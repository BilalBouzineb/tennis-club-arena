
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Award, Calendar, Edit, Save, Trophy } from "lucide-react";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileHistory } from "@/components/profile/ProfileHistory";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    memberSince: "2021",
    rankingPoints: 1250,
    membershipType: "Premium",
    skillLevel: "Intermediate",
    wins: 27,
    losses: 15,
    nextMatch: "May 25, 2025 - 14:00",
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={userData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {userData.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="outline" className="mb-2">
                {userData.membershipType} Member
              </Badge>
              <Badge className="ml-2 mb-2" variant="secondary">
                {userData.skillLevel} Player
              </Badge>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="flex items-center justify-center gap-1 mb-2">
                  <Award className="h-4 w-4" />
                  <span>Ranking Points: {userData.rankingPoints}</span>
                </p>
                <p className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since: {userData.memberSince}</span>
                </p>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 w-full" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match Stats</CardTitle>
              <CardDescription>Your performance record</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileStats wins={userData.wins} losses={userData.losses} />
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Next Match</p>
                <p className="text-sm text-muted-foreground">{userData.nextMatch}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
              <CardDescription>
                {isEditing ? "Edit your personal details below" : "Your personal details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="Your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skill">Skill Level</Label>
                      <Input id="skill" defaultValue={userData.skillLevel} />
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleSave}>Save Changes</Button>
                </div>
              ) : (
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="history">Match History</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-6">
                    <ProfileHistory />
                  </TabsContent>
                  <TabsContent value="achievements">
                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-4">Your Achievements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <div className="mr-4 bg-accent rounded-full p-2">
                                <Trophy className="h-5 w-5 text-accent-foreground" />
                              </div>
                              <div>
                                <h4 className="font-medium">Spring Tournament 2024</h4>
                                <p className="text-sm text-muted-foreground">2nd Place</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <div className="mr-4 bg-accent rounded-full p-2">
                                <Trophy className="h-5 w-5 text-accent-foreground" />
                              </div>
                              <div>
                                <h4 className="font-medium">Club Championship</h4>
                                <p className="text-sm text-muted-foreground">Quarter-finalist</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="lessons">
                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-4">Upcoming Lessons</h3>
                      <Card className="mb-4">
                        <CardContent className="pt-6">
                          <div className="flex items-center">
                            <div className="mr-4 bg-primary rounded-full p-2">
                              <Calendar className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium">Advanced Serve Technique</h4>
                              <p className="text-sm text-muted-foreground">May 26, 2025 - 10:00 AM • Coach: Mike Rogers</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center">
                            <div className="mr-4 bg-primary rounded-full p-2">
                              <Calendar className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium">Forehand Fundamentals</h4>
                              <p className="text-sm text-muted-foreground">May 28, 2025 - 4:00 PM • Coach: Sarah Williams</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Book New Lesson
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
