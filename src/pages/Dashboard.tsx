
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Trophy, MessageSquare, UserCheck, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpcomingMatches } from "@/components/dashboard/UpcomingMatches";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { AnnouncementCard } from "@/components/dashboard/AnnouncementCard";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Player Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Match</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              May 25
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">vs. Michael Roberts</p>
            <p className="text-sm font-medium">Court 3 • 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tournament</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Quarter-finals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Summer Open 2025</p>
            <p className="text-sm font-medium">Starting Jun 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Court Status</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-accent" />
              3 Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Courts 1, 3, and 5</p>
            <p className="text-sm font-medium">Book now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Coaching</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <UserCheck className="mr-2 h-5 w-5 text-primary" />
              2 Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This week</p>
            <p className="text-sm font-medium">Coach: Sarah Williams</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Matches</CardTitle>
                <Button variant="outline" size="sm">Schedule Match</Button>
              </div>
              <CardDescription>Your upcoming tennis matches</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingMatches />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest club activities and your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <AnnouncementCard 
            title="Summer Tournament Registration Open" 
            date="Posted on May 17, 2025"
            urgent={true}
          >
            <p className="mb-2">
              Registration for the Summer Tournament is now open! Sign up before June 1 to secure your spot.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">Tournament</Badge>
              <Badge variant="outline">Registration</Badge>
            </div>
            <Button size="sm" className="w-full">Register Now</Button>
          </AnnouncementCard>

          <Card className="my-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Chat Updates
              </CardTitle>
              <CardDescription>Recent messages from your groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-3 py-2">
                <p className="text-sm font-medium">Doubles Partners</p>
                <p className="text-xs text-muted-foreground">Sarah: Looking forward to our practice session!</p>
              </div>
              <div className="border-l-4 border-secondary pl-3 py-2">
                <p className="text-sm font-medium">Club Announcements</p>
                <p className="text-xs text-muted-foreground">Admin: Court maintenance scheduled for next week</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Messages
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Court Availability
              </CardTitle>
              <CardDescription>Today's court schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Court 1</p>
                  <p className="text-xs text-muted-foreground">Indoor • Hard</p>
                </div>
                <Badge className="bg-green-500">Available</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Court 2</p>
                  <p className="text-xs text-muted-foreground">Indoor • Clay</p>
                </div>
                <Badge variant="outline">Booked until 4PM</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Court 3</p>
                  <p className="text-xs text-muted-foreground">Outdoor • Hard</p>
                </div>
                <Badge className="bg-green-500">Available</Badge>
              </div>
              <Button className="w-full mt-2">Book a Court</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
