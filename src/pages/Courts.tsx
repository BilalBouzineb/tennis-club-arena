
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourtSchedule from "@/components/courts/CourtSchedule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Info, MapPin } from "lucide-react";

const Courts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Court Booking</h1>
            <p className="text-gray-600">
              Reserve a tennis court for your next practice or match
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Club Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Booking Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Bookings limited to 1 hour per session</li>
                    <li>Maximum 3 bookings per week</li>
                    <li>Cancellations allowed up to 24 hours before</li>
                    <li>Late cancellations may incur a fee</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Court Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">123 Tennis Club Drive<br />Springfield, ST 12345</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="book">
            <TabsList className="mb-6">
              <TabsTrigger value="book">Book a Court</TabsTrigger>
              <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="book">
              <CourtSchedule />
            </TabsContent>
            <TabsContent value="my-bookings">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-4">View Your Court Reservations</h3>
                <p className="mb-6">Check your upcoming bookings, past reservations, or manage your schedule</p>
                <Button asChild>
                  <a href="/my-bookings">Go to My Bookings</a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courts;
