
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

// Mock player ranking data
const playerRankings = [
  {
    id: 1,
    rank: 1,
    name: "John Smith",
    wins: 42,
    losses: 5,
    winPercentage: 89.4,
    points: 3250,
    level: "Advanced",
    avatarUrl: null,
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Johnson",
    wins: 38,
    losses: 8,
    winPercentage: 82.6,
    points: 3100,
    level: "Advanced",
    avatarUrl: null,
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Chen",
    wins: 36,
    losses: 10,
    winPercentage: 78.3,
    points: 2950,
    level: "Advanced",
    avatarUrl: null,
  },
  {
    id: 4,
    rank: 4,
    name: "Emma Wilson",
    wins: 34,
    losses: 12,
    winPercentage: 73.9,
    points: 2820,
    level: "Advanced",
    avatarUrl: null,
  },
  {
    id: 5,
    rank: 5,
    name: "Robert Davis",
    wins: 32,
    losses: 15,
    winPercentage: 68.1,
    points: 2700,
    level: "Intermediate",
    avatarUrl: null,
  },
  {
    id: 6,
    rank: 6,
    name: "Lisa Zhang",
    wins: 30,
    losses: 16,
    winPercentage: 65.2,
    points: 2580,
    level: "Intermediate",
    avatarUrl: null,
  },
  {
    id: 7,
    rank: 7,
    name: "David Miller",
    wins: 28,
    losses: 18,
    winPercentage: 60.9,
    points: 2470,
    level: "Intermediate",
    avatarUrl: null,
  },
  {
    id: 8,
    rank: 8,
    name: "Sofia Gonzalez",
    wins: 26,
    losses: 20,
    winPercentage: 56.5,
    points: 2350,
    level: "Intermediate",
    avatarUrl: null,
  },
  {
    id: 9,
    rank: 9,
    name: "James Wilson",
    wins: 24,
    losses: 22,
    winPercentage: 52.2,
    points: 2230,
    level: "Intermediate",
    avatarUrl: null,
  },
  {
    id: 10,
    rank: 10,
    name: "Olivia Brown",
    wins: 22,
    losses: 24,
    winPercentage: 47.8,
    points: 2100,
    level: "Intermediate",
    avatarUrl: null,
  },
];

const PlayerRankings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredPlayers = playerRankings.filter((player) => {
    // Filter by search term
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by level
    const matchesLevel = selectedLevel ? player.level === selectedLevel : true;

    return matchesSearch && matchesLevel;
  });

  const levels = Array.from(
    new Set(playerRankings.map((player) => player.level))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search players..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 tennis-input"
          />
        </div>

        {/* Level filter */}
        <div className="flex gap-2">
          <Button
            variant={selectedLevel === null ? "default" : "outline"}
            onClick={() => setSelectedLevel(null)}
            className={selectedLevel === null ? "bg-tennis-green" : ""}
          >
            All
          </Button>
          {levels.map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              onClick={() => setSelectedLevel(level)}
              className={selectedLevel === level ? "bg-tennis-green" : ""}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">W/L</TableHead>
              <TableHead className="text-right">Win %</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="text-center font-medium">
                  {player.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User className="h-4 w-4" />
                    </div>
                    <span>{player.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {player.wins}-{player.losses}
                </TableCell>
                <TableCell className="text-right">
                  {player.winPercentage.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-medium">
                  {player.points}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                    {player.level}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/players/${player.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlayerRankings;
