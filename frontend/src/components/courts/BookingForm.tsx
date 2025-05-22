
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock } from "lucide-react";

// Mock data for courts
const courts = [
  { id: 1, name: "Court 1", type: "Hard Court", isIndoor: false },
  { id: 2, name: "Court 2", type: "Clay Court", isIndoor: false },
  { id: 3, name: "Court 3", type: "Hard Court", isIndoor: true },
  { id: 4, name: "Court 4", type: "Clay Court", isIndoor: true },
];

const bookingFormSchema = z.object({
  playerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  playerCount: z.enum(["1", "2", "3", "4"], {
    required_error: "Please select the number of players.",
  }),
  equipment: z.enum(["none", "racket", "balls", "both"], {
    required_error: "Please select equipment needs.",
  }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  courtId: number;
  date: Date;
  timeSlot: string;
  onComplete: (success: boolean) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  courtId,
  date,
  timeSlot,
  onComplete,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedCourt = courts.find(court => court.id === courtId);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      playerName: "",
      playerCount: "2",
      equipment: "none",
      notes: "",
    },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const onSubmit = (values: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Here we'd normally send data to a backend API
    console.log({
      courtId,
      date: date.toISOString().split('T')[0],
      timeSlot,
      ...values
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(true);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          <div className="font-medium">{selectedCourt?.name}</div>
          <div className="text-muted-foreground text-sm">({selectedCourt?.type}, {selectedCourt?.isIndoor ? 'Indoor' : 'Outdoor'})</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{timeSlot}</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="playerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Player Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Number of Players</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">1</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">2</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">3</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">4</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="equipment"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Equipment Needed</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal">None</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="racket" />
                      </FormControl>
                      <FormLabel className="font-normal">Racket Rental</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="balls" />
                      </FormControl>
                      <FormLabel className="font-normal">Tennis Balls</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="both" />
                      </FormControl>
                      <FormLabel className="font-normal">Both</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or additional information"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => onComplete(false)} 
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
