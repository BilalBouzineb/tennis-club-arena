
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookingForm } from "./BookingForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Calendar as CalendarIcon } from "lucide-react";

// Mock data for courts
const courts = [
  { id: 1, name: "Court 1", type: "Hard Court", isIndoor: false },
  { id: 2, name: "Court 2", type: "Clay Court", isIndoor: false },
  { id: 3, name: "Court 3", type: "Hard Court", isIndoor: true },
  { id: 4, name: "Court 4", type: "Clay Court", isIndoor: true },
];

// Mock data for time slots
const timeSlots = [
  "08:00 - 09:00", 
  "09:00 - 10:00", 
  "10:00 - 11:00", 
  "11:00 - 12:00",
  "12:00 - 13:00", 
  "13:00 - 14:00", 
  "14:00 - 15:00", 
  "15:00 - 16:00",
  "16:00 - 17:00", 
  "17:00 - 18:00", 
  "18:00 - 19:00", 
  "19:00 - 20:00",
  "20:00 - 21:00", 
  "21:00 - 22:00"
];

// Mock data for bookings
const mockBookings = [
  { id: 1, courtId: 1, date: new Date().toISOString().split('T')[0], timeSlot: "10:00 - 11:00", userId: "user1", userName: "John Doe" },
  { id: 2, courtId: 2, date: new Date().toISOString().split('T')[0], timeSlot: "14:00 - 15:00", userId: "user2", userName: "Sarah Williams" },
  { id: 3, courtId: 3, date: new Date().toISOString().split('T')[0], timeSlot: "18:00 - 19:00", userId: "user1", userName: "John Doe" },
  // Add bookings for tomorrow
  { id: 4, courtId: 1, date: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: "09:00 - 10:00", userId: "user3", userName: "Michael Chen" },
  // Add maintenance slots
  { id: 5, courtId: 4, date: new Date().toISOString().split('T')[0], timeSlot: "12:00 - 15:00", isMaintenance: true, reason: "Surface Resurfacing" },
];

const CourtSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{ courtId: number, date: Date, timeSlot: string } | null>(null);
  const { toast } = useToast();

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const isSlotBooked = (courtId: number, timeSlot: string) => {
    return mockBookings.some(
      booking => 
        booking.courtId === courtId && 
        booking.date === formatDate(selectedDate) && 
        booking.timeSlot === timeSlot
    );
  };

  const isMaintenanceSlot = (courtId: number, timeSlot: string) => {
    return mockBookings.some(
      booking => 
        booking.courtId === courtId && 
        booking.date === formatDate(selectedDate) && 
        booking.timeSlot === timeSlot &&
        booking.isMaintenance === true
    );
  };

  const getBookingInfo = (courtId: number, timeSlot: string) => {
    return mockBookings.find(
      booking => 
        booking.courtId === courtId && 
        booking.date === formatDate(selectedDate) && 
        booking.timeSlot === timeSlot
    );
  };

  const handleProceedToBooking = () => {
    if (!selectedCourt || !selectedTimeSlot || !selectedDate) {
      toast({
        title: "Selection Required",
        description: "Please select a court, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    setBookingDetails({
      courtId: selectedCourt,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });
    
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (success: boolean) => {
    setBookingDialogOpen(false);
    setSelectedCourt(null);
    setSelectedTimeSlot(null);
    
    if (success) {
      toast({
        title: "Court Booked!",
        description: `Your booking has been confirmed. You can view it in My Bookings.`,
      });
    }
  };

  const getCourtCardClassName = (courtId: number) => {
    const baseClasses = "h-40 p-4 flex flex-col items-center justify-center cursor-pointer transition-all border rounded-lg";
    
    if (selectedCourt === courtId) {
      return `${baseClasses} ring-2 ring-primary bg-primary/10`;
    }
    
    return `${baseClasses} hover:bg-accent/10`;
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Calendar for Date Selection */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="p-0 w-full"
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </Card>

        {/* Court Selection */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Select Court
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {courts.map((court) => (
              <div
                key={court.id}
                className={getCourtCardClassName(court.id)}
                onClick={() => setSelectedCourt(court.id)}
              >
                <h4 className="font-bold text-lg">{court.name}</h4>
                <p className="text-sm text-gray-600">{court.type}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {court.isIndoor ? "Indoor" : "Outdoor"}
                </p>
                {selectedCourt === court.id && (
                  <div className="mt-2">
                    <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedCourt && (
            <>
              <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {timeSlots.map((timeSlot) => {
                  const isBooked = isSlotBooked(selectedCourt, timeSlot);
                  const isMaintenance = isMaintenanceSlot(selectedCourt, timeSlot);
                  const bookingInfo = getBookingInfo(selectedCourt, timeSlot);
                  
                  return (
                    <div
                      key={timeSlot}
                      className={`p-2 border rounded-md text-center text-sm cursor-pointer transition-colors ${
                        isBooked 
                          ? isMaintenance
                            ? "bg-orange-100 text-orange-800 border-orange-200 cursor-not-allowed"
                            : "bg-gray-100 text-gray-500 cursor-not-allowed" 
                          : selectedTimeSlot === timeSlot
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "hover:bg-accent/20"
                      }`}
                      onClick={() => {
                        if (!isBooked) setSelectedTimeSlot(timeSlot);
                      }}
                    >
                      {timeSlot}
                      {isBooked && !isMaintenance && (
                        <div className="text-xs mt-1 font-medium">Booked</div>
                      )}
                      {isMaintenance && (
                        <div className="text-xs mt-1 font-medium">Maintenance</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </div>

      {selectedCourt && selectedTimeSlot && (
        <div className="flex justify-end">
          <Button 
            onClick={handleProceedToBooking}
            className="gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            Book Court
          </Button>
        </div>
      )}

      {/* Booking Form Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book a Court</DialogTitle>
          </DialogHeader>
          {bookingDetails && (
            <BookingForm 
              courtId={bookingDetails.courtId}
              date={bookingDetails.date}
              timeSlot={bookingDetails.timeSlot}
              onComplete={handleBookingComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourtSchedule;
