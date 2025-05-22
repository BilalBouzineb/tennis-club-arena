
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TournamentList from "@/components/tournaments/TournamentList";

const Tournaments = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tournaments</h1>
            <p className="text-gray-600">
              Browse upcoming and past tournaments hosted by our tennis club.
            </p>
          </div>
          <TournamentList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;
