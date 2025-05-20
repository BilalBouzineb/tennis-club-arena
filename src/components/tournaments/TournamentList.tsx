
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

// Mock tournament data
const tournaments = [
  {
    id: 1,
    title: "Summer Championship",
    startDate: "2025-06-15",
    endDate: "2025-06-21",
    registrationDeadline: "2025-06-10",
    category: "Open",
    status: "Upcoming",
    description:
      "Our annual summer championship with singles and doubles categories. Open to all skill levels.",
    entryFee: "$50",
    prizes: "$1000 prize pool",
    location: "Main Club Courts",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Junior Development Series",
    startDate: "2025-07-08",
    endDate: "2025-07-10",
    registrationDeadline: "2025-07-01",
    category: "Junior",
    status: "Upcoming",
    description:
      "A tournament designed for junior players under 18 to develop their competitive skills.",
    entryFee: "$25",
    prizes: "Trophies and medals",
    location: "Courts 1-3",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Veterans Cup",
    startDate: "2025-08-12",
    endDate: "2025-08-14",
    registrationDeadline: "2025-08-05",
    category: "Veterans 40+",
    status: "Upcoming",
    description:
      "Tournament for players over 40 years old. Singles and doubles categories available.",
    entryFee: "$40",
    prizes: "Trophies and club memberships",
    location: "Indoor Courts",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Spring Doubles Challenge",
    startDate: "2025-04-20",
    endDate: "2025-04-22",
    registrationDeadline: "2025-04-15",
    category: "Doubles Only",
    status: "Completed",
    description:
      "Team up with a partner for this exciting doubles-only tournament. All skill levels welcome.",
    entryFee: "$60 per team",
    prizes: "$500 prize pool",
    location: "All Courts",
    image: "/placeholder.svg"
  }
];

const TournamentList = () => {
  return (
    <div className="space-y-8">
      {/* Upcoming Tournaments */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-tennis-green" />
          Upcoming Tournaments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments
            .filter((tournament) => tournament.status === "Upcoming")
            .map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-200">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{tournament.title}</h3>
                    <Badge className="bg-tennis-green">{tournament.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tournament.description}</p>
                  <div className="text-sm space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Dates:</span>
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} - 
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Registration:</span>
                      <span>Until {new Date(tournament.registrationDeadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fee:</span>
                      <span>{tournament.entryFee}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/tournaments/${tournament.id}`}>
                      <Button className="w-full bg-tennis-blue hover:bg-tennis-blue-dark">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Tournaments */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-gray-400" />
          Past Tournaments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments
            .filter((tournament) => tournament.status === "Completed")
            .map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden flex flex-col opacity-80">
                <div className="h-40 bg-gray-200">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{tournament.title}</h3>
                    <Badge variant="outline" className="border-gray-400 text-gray-600">
                      {tournament.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tournament.description}</p>
                  <div className="text-sm space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Dates:</span>
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} - 
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/tournaments/${tournament.id}`}>
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentList;
