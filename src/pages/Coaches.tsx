
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Calendar, MessageSquare } from "lucide-react";
import { CoachSchedule } from "@/components/coaches/CoachSchedule";
import { CoachReviews } from "@/components/coaches/CoachReviews";
import { useToast } from "@/hooks/use-toast";

const Coaches = () => {
  const { toast } = useToast();

  const bookCoach = (name: string) => {
    toast({
      title: "Booking request sent",
      description: `Your booking request with ${name} has been sent.`,
    });
  };

  // Mock data for coaches
  const coaches = [
    {
      id: 1,
      name: "Sarah Williams",
      specialty: "Serve & Volley",
      experience: "12 years",
      rating: 4.9,
      availability: "Mon-Fri",
      image: "/placeholder.svg",
      bio: "Former professional player with a focus on technical development and match strategy. Specializes in serve and volley techniques.",
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Baseline Play",
      experience: "8 years",
      rating: 4.7,
      availability: "Weekends",
      image: "/placeholder.svg",
      bio: "Certified coach with experience training junior players. Expert in baseline consistency and groundstroke technique.",
    },
    {
      id: 3,
      name: "David Rodriguez",
      specialty: "Footwork & Agility",
      experience: "15 years",
      rating: 4.8,
      availability: "Tue-Sat",
      image: "/placeholder.svg",
      bio: "Former collegiate player focusing on movement patterns and court positioning. Helps players improve speed and reaction time.",
    },
    {
      id: 4,
      name: "Emma Thompson",
      specialty: "Mental Game",
      experience: "10 years",
      rating: 4.6,
      availability: "Mon-Wed",
      image: "/placeholder.svg",
      bio: "Sports psychology background with tennis expertise. Helps players overcome mental blocks and build confidence on court.",
    }
  ];

  const [selectedCoach, setSelectedCoach] = React.useState<number | null>(null);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tennis Coaches</h1>
        <Button variant="outline">Request Custom Training</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {coaches.map((coach) => (
          <Card key={coach.id} className="overflow-hidden">
            <div className="relative pb-1/3">
              <div className="w-full p-6 flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={coach.image} alt={coach.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {coach.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardHeader className="pb-2 text-center">
              <CardTitle>{coach.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center justify-center mt-1">
                  <Badge variant="secondary" className="mr-2">
                    {coach.specialty}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                    <span className="text-sm">{coach.rating}</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {coach.experience} experience
              </p>
              <p className="text-sm">Available: {coach.availability}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedCoach(coach.id)}
                className="w-1/2"
              >
                Profile
              </Button>
              <Button 
                size="sm" 
                onClick={() => bookCoach(coach.name)}
                className="w-1/2 ml-2"
              >
                Book
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCoach && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Coach Profile</CardTitle>
              <CardDescription>
                View details and schedule for {coaches.find(c => c.id === selectedCoach)?.name}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedCoach(null)}
            >
              Close
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage 
                      src={coaches.find(c => c.id === selectedCoach)?.image}
                      alt={coaches.find(c => c.id === selectedCoach)?.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {coaches.find(c => c.id === selectedCoach)?.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl">{coaches.find(c => c.id === selectedCoach)?.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                      <span>{coaches.find(c => c.id === selectedCoach)?.rating} Rating</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Specialty</h4>
                    <p className="text-sm text-muted-foreground">
                      {coaches.find(c => c.id === selectedCoach)?.specialty}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      {coaches.find(c => c.id === selectedCoach)?.experience}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">About</h4>
                    <p className="text-sm text-muted-foreground">
                      {coaches.find(c => c.id === selectedCoach)?.bio}
                    </p>
                  </div>
                  <div className="pt-4 flex gap-2">
                    <Button className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" /> Book Session
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <Tabs defaultValue="schedule">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="schedule" className="pt-4">
                    <CoachSchedule coachId={selectedCoach} />
                  </TabsContent>
                  <TabsContent value="reviews" className="pt-4">
                    <CoachReviews coachId={selectedCoach} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Coaching Programs</CardTitle>
          <CardDescription>Special training programs available at our club</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Beginner's Academy</CardTitle>
                <CardDescription>Perfect for new players</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>6-week progressive program</li>
                  <li>Basics of forehand and backhand</li>
                  <li>Introduction to serving</li>
                  <li>Group sessions of 4-6 players</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Technique</CardTitle>
                <CardDescription>For intermediate players</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>8-week specialized training</li>
                  <li>Advanced stroke mechanics</li>
                  <li>Strategy development</li>
                  <li>Small group format (2-4 players)</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Competition Prep</CardTitle>
                <CardDescription>Tournament readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>10-week intensive program</li>
                  <li>Match simulation and analysis</li>
                  <li>Physical conditioning</li>
                  <li>Mental game preparation</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Coaches;
