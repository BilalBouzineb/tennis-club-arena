
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlayerRankings from "@/components/players/PlayerRankings";

const Rankings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Player Rankings</h1>
            <p className="text-gray-600">
              View rankings of all players in our tennis club based on performance.
            </p>
          </div>
          <PlayerRankings />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rankings;
