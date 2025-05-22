
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            className={`h-full w-full rounded-full absolute 
              ${isFlipping ? 'animate-[flip_2s_linear]' : ''} 
              ${!isFlipping && result ? 
                (result === 'heads' ? 'rotate-0' : 'rotate-y-180') : ''}`}
          >
            {/* Heads side - Moroccan Dirham */}
            <div className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full"></div>
              <div className="absolute inset-1 rounded-full flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/XgwMHo3.png" 
                  alt="Moroccan Dirham Heads" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              {!isFlipping && result === "heads" && (
                <span className="absolute bottom-1 text-white font-bold z-10 text-xs bg-black/50 px-2 py-0.5 rounded-full">HEADS</span>
              )}
            </div>
            
            {/* Tails side - Moroccan Dirham */}
            <div className="absolute inset-0 rounded-full flex items-center justify-center rotate-y-180 backface-hidden overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full"></div>
              <div className="absolute inset-1 rounded-full flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/tR7oa3q.png" 
                  alt="Moroccan Dirham Tails" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              {!isFlipping && result === "tails" && (
                <span className="absolute bottom-1 text-white font-bold z-10 text-xs bg-black/50 px-2 py-0.5 rounded-full">TAILS</span>
              )}
            </div>
          </div>
        </div>

        <Button 
          onClick={flipCoin} 
          disabled={isFlipping}
          className="mt-4 bg-amber-500 hover:bg-amber-600"
        >
          {isFlipping ? "Flipping..." : "Flip Dirham"}
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
