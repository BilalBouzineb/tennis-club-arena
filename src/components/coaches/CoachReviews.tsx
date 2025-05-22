
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface CoachReviewsProps {
  coachId: number;
}

export const CoachReviews: React.FC<CoachReviewsProps> = ({ coachId }) => {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      date: "May 10, 2025",
      rating: 5,
      comment: "Sarah is an excellent coach! She helped me improve my backhand tremendously in just a few sessions. Her teaching style is clear and she gives great feedback."
    },
    {
      id: 2,
      name: "Emma Thompson",
      date: "April 28, 2025",
      rating: 4,
      comment: "Very knowledgeable and patient coach. I've been working on my serve with her and have seen noticeable improvements. Would recommend!"
    },
    {
      id: 3,
      name: "Michael Chen",
      date: "April 15, 2025",
      rating: 5,
      comment: "I've been taking lessons with this coach for about a month now and my game has improved significantly. The drills are challenging but effective."
    },
    {
      id: 4,
      name: "David Rodriguez",
      date: "March 22, 2025",
      rating: 4,
      comment: "Great attention to detail and very good at breaking down complex techniques into simple steps. I appreciate the personalized approach."
    }
  ];

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Student Reviews</h3>
        <div className="flex items-center">
          <div className="flex mr-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-4 w-4 ${star <= Math.round(averageRating) 
                  ? "fill-accent text-accent" 
                  : "fill-none text-muted"}`} 
              />
            ))}
          </div>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">({reviews.length} reviews)</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {review.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{review.name}</p>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-3 w-3 ${star <= review.rating 
                          ? "fill-accent text-accent" 
                          : "fill-none text-muted"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
