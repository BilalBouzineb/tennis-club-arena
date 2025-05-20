
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
  { courtId: 1, date: new Date().toISOString().split('T')[0], timeSlot: "10:00 - 11:00" },
  { courtId: 2, date: new Date().toISOString().split('T')[0], timeSlot: "14:00 - 15:00" },
  { courtId: 3, date: new Date().toISOString().split('T')[0], timeSlot: "18:00 - 19:00" },
];

const CourtSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
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

  const handleBookCourt = () => {
    if (!selectedCourt || !selectedTimeSlot || !selectedDate) {
      toast({
        title: "Booking Failed",
        description: "Please select a court, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking API call
    setTimeout(() => {
      toast({
        title: "Court Booked!",
        description: `You have booked Court ${selectedCourt} on ${formatDate(selectedDate)} at ${selectedTimeSlot}.`,
      });
      
      // Reset selections
      setSelectedCourt(null);
      setSelectedTimeSlot(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Calendar for Date Selection */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="p-0 w-full pointer-events-auto"
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </Card>

        {/* Court Selection */}
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Select Court</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {courts.map((court) => (
              <div
                key={court.id}
                className={`tennis-court h-40 p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  selectedCourt === court.id ? "ring-4 ring-tennis-green" : ""
                }`}
                onClick={() => setSelectedCourt(court.id)}
              >
                <h4 className="font-bold text-lg">{court.name}</h4>
                <p className="text-sm text-gray-600">{court.type}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {court.isIndoor ? "Indoor" : "Outdoor"}
                </p>
                {selectedCourt === court.id && (
                  <div className="mt-2">
                    <span className="inline-block bg-tennis-green text-white text-xs px-2 py-1 rounded-full">
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
                  return (
                    <div
                      key={timeSlot}
                      className={`p-2 border rounded-md text-center text-sm cursor-pointer transition-colors ${
                        isBooked 
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                          : selectedTimeSlot === timeSlot
                          ? "bg-tennis-green text-white" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        if (!isBooked) setSelectedTimeSlot(timeSlot);
                      }}
                    >
                      {timeSlot}
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
            onClick={handleBookCourt}
            className="bg-tennis-green hover:bg-tennis-green-dark"
          >
            Book Court
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourtSchedule;
