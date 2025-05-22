
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

// Mock booking data for current user
const mockUserBookings = [
  {
    id: "b1",
    courtId: 1,
    courtName: "Court 1",
    courtType: "Hard Court",
    isIndoor: false,
    date: "2025-05-25",
    timeSlot: "10:00 - 11:00",
    playerName: "John Doe",
    playerCount: 2,
    equipment: "none",
    status: "upcoming",
    notes: ""
  },
  {
    id: "b2",
    courtId: 3,
    courtName: "Court 3",
    courtType: "Hard Court",
    isIndoor: true,
    date: "2025-05-28",
    timeSlot: "14:00 - 15:00",
    playerName: "John Doe",
    playerCount: 4,
    equipment: "balls",
    status: "upcoming",
    notes: "Need extra balls for practice"
  },
  {
    id: "b3",
    courtId: 2,
    courtName: "Court 2",
    courtType: "Clay Court",
    isIndoor: false,
    date: "2025-05-10",
    timeSlot: "09:00 - 10:00",
    playerName: "John Doe",
    playerCount: 2,
    equipment: "racket",
    status: "completed",
    notes: "Needed racket rental"
  },
  {
    id: "b4",
    courtId: 4,
    courtName: "Court 4",
    courtType: "Clay Court",
    isIndoor: true,
    date: "2025-05-05",
    timeSlot: "18:00 - 19:00",
    playerName: "John Doe",
    playerCount: 3,
    equipment: "both",
    status: "completed",
    notes: ""
  },
  {
    id: "b5",
    courtId: 1,
    courtName: "Court 1",
    courtType: "Hard Court",
    isIndoor: false,
    date: "2025-04-28",
    timeSlot: "16:00 - 17:00",
    playerName: "John Doe",
    playerCount: 2,
    equipment: "none",
    status: "cancelled",
    notes: "Had to cancel due to weather"
  }
];

const MyBookings = () => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCancelBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBookingId) {
      // In a real app, this would call an API to cancel the booking
      toast({
        title: "Booking Cancelled",
        description: "Your court reservation has been cancelled successfully.",
      });
      setCancelDialogOpen(false);
      setSelectedBookingId(null);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateString: string, timeSlot: string) => {
    const [startTime] = timeSlot.split(' - ');
    const [hours, minutes] = startTime.split(':').map(Number);
    
    const bookingDate = new Date(dateString);
    bookingDate.setHours(hours, minutes, 0, 0);
    
    return bookingDate > new Date();
  };

  const upcomingBookings = mockUserBookings.filter(booking => 
    booking.status === 'upcoming' && isUpcoming(booking.date, booking.timeSlot)
  );
  
  const pastBookings = mockUserBookings.filter(booking => 
    booking.status === 'completed' || (booking.status === 'upcoming' && !isUpcoming(booking.date, booking.timeSlot))
  );
  
  const cancelledBookings = mockUserBookings.filter(booking => booking.status === 'cancelled');

  const renderBookingCard = (booking: any, allowCancel = false) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{booking.courtName}</h3>
            <p className="text-sm text-muted-foreground">
              {booking.courtType}, {booking.isIndoor ? 'Indoor' : 'Outdoor'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {booking.status === 'cancelled' ? (
              <Badge variant="outline" className="text-destructive">Cancelled</Badge>
            ) : booking.status === 'completed' || !isUpcoming(booking.date, booking.timeSlot) ? (
              <Badge variant="outline" className="text-muted-foreground">Completed</Badge>
            ) : (
              <Badge className="bg-primary">Upcoming</Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDisplayDate(booking.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.timeSlot}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{booking.playerCount} {booking.playerCount > 1 ? 'Players' : 'Player'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {booking.equipment !== 'none' && (
              <div className="flex items-start gap-2">
                <span className="font-medium">Equipment:</span>
                <span>
                  {booking.equipment === 'racket' ? 'Racket Rental' :
                   booking.equipment === 'balls' ? 'Tennis Balls' :
                   booking.equipment === 'both' ? 'Racket & Balls' : ''}
                </span>
              </div>
            )}
            
            {booking.notes && (
              <div className="flex items-start gap-2">
                <span className="font-medium">Notes:</span>
                <span>{booking.notes}</span>
              </div>
            )}
            
            {allowCancel && (
              <div className="flex justify-end mt-4">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel Booking
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">
              View and manage your court reservations
            </p>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map(booking => renderBookingCard(booking, true))
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">You don't have any upcoming court bookings</p>
                  <Button className="mt-4" asChild>
                    <a href="/courts">Book a Court</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {pastBookings.length > 0 ? (
                pastBookings.map(booking => renderBookingCard(booking))
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">No past bookings found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="space-y-4">
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map(booking => renderBookingCard(booking))
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">No cancelled bookings found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Court Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this court booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancelBooking} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyBookings;
