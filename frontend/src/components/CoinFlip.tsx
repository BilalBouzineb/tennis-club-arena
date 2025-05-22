
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";

type CoinSide = "heads" | "tails";

const CoinFlip = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinSide | null>(null);

  const flipCoin = () => {
    // Don't allow flipping while animation is in progress
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    // Randomize the result
    const newResult: CoinSide = Math.random() > 0.5 ? "heads" : "tails";
    
    // Set a timeout to stop the animation and display the result
    setTimeout(() => {
      setIsFlipping(false);
      setResult(newResult);
    }, 2000); // 2 second animation
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Coin Flip Challenge</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-40 w-40 mb-6">
          {/* Coin container */}
          <div 
            className={`h-full w-full rounded-full bg-tennis-yellow shadow-lg absolute 
              ${isFlipping ? 'animate-[flip_2s_linear]' : ''} 
              ${!isFlipping && result ? 
                (result === 'heads' ? 'rotate-0' : 'rotate-y-180') : ''}`}
          >
            {/* Heads side */}
            <div className="absolute inset-0 bg-tennis-yellow rounded-full flex items-center justify-center backface-hidden">
              <Coins className="h-20 w-20 text-white" />
              {!isFlipping && result === "heads" && (
                <span className="absolute bottom-2 text-white font-bold">HEADS</span>
              )}
            </div>
            
            {/* Tails side */}
            <div className="absolute inset-0 bg-tennis-green rounded-full flex items-center justify-center rotate-y-180 backface-hidden">
              <Coins className="h-20 w-20 text-white" />
              {!isFlipping && result === "tails" && (
                <span className="absolute bottom-2 text-white font-bold">TAILS</span>
              )}
            </div>
          </div>
        </div>

        <Button 
          onClick={flipCoin} 
          disabled={isFlipping}
          className="mt-4"
        >
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </Button>
        
        {result && !isFlipping && (
          <p className="mt-4 text-lg font-medium">
            Result: <span className="font-bold uppercase">{result}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CoinFlip;
