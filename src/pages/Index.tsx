
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-tennis-green to-tennis-green-dark text-white py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Welcome to Tennis Club RTCF
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-lg">
                  Join our vibrant tennis community and enjoy premium courts, expert coaching, 
                  tournaments, and a friendly atmosphere for players of all levels.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/courts">
                    <Button size="lg" className="bg-white text-tennis-green hover:bg-gray-100">
                      Book a Court
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                      Join Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Tennis court" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Premium Tennis Facilities</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-tennis-yellow hidden md:block"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Club Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-tennis-green/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-tennis-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Court Booking</h3>
                <p className="text-gray-600 mb-4">
                  Easily reserve courts online with our intuitive booking system. 
                  View availability and book your preferred time slot.
                </p>
                <Link to="/courts" className="text-tennis-green hover:text-tennis-green-dark font-medium">
                  Book a Court →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-tennis-blue/10 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-tennis-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tournaments</h3>
                <p className="text-gray-600 mb-4">
                  Participate in competitive tournaments for all skill levels. 
                  Challenge yourself and improve your game.
                </p>
                <Link to="/tournaments" className="text-tennis-blue hover:text-tennis-blue-dark font-medium">
                  View Tournaments →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-tennis-yellow/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-tennis-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Player Rankings</h3>
                <p className="text-gray-600 mb-4">
                  Track your progress and compete for the top spot in our club rankings. 
                  See where you stand among fellow members.
                </p>
                <Link to="/rankings" className="text-tennis-green hover:text-tennis-green-dark font-medium">
                  Check Rankings →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-tennis-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Tennis Club?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Become a member today and enjoy access to premium courts, tournaments, coaching, and a vibrant tennis community.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-tennis-blue hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg relative">
                <div className="mb-4 text-tennis-green">
                  {/* Quote icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  "The court booking system is so convenient, and the facilities are always in perfect condition. I love being part of this club!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Emily Richardson</p>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg relative">
                <div className="mb-4 text-tennis-green">
                  {/* Quote icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  "The tournaments are well-organized and competitive. It's a great way to improve my game and meet other tennis enthusiasts."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Marcus Johnson</p>
                    <p className="text-sm text-gray-500">Member since 2022</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg relative">
                <div className="mb-4 text-tennis-green">
                  {/* Quote icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  "As a beginner, I was worried about fitting in, but everyone here is so welcoming. The coaching staff is amazing!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Sophia Martinez</p>
                    <p className="text-sm text-gray-500">Member since 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
