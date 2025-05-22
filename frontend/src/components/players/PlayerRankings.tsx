
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { Search, User, ShieldAlert, Loader2 } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  // email: string; // Add other user fields if needed
}

interface PlayerData {
  id: number; // This is player_id
  user_id: number;
  points: number;
  matches_played: number;
  matches_won: number;
  user: UserData;
  // group_id: number; // If available and needed
}

interface GroupData {
  group_id: number; // Changed from 'id' to 'group_id' to match API response
  group_name: string;
  group_level: number;
  players: PlayerData[];
}

const PlayerRankings = () => {
  const [groupsData, setGroupsData] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string | null>(null); // For filtering by group name

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Adjust the URL if your API is hosted elsewhere or needs a specific port
        const response = await axios.get<{ data: GroupData[] }>("/api/v1/rankings/all");
        setGroupsData(response.data.data || []); // Assuming data is nested under a 'data' key
      } catch (err) {
        setError("Failed to fetch rankings. Please try again later.");
        console.error("Error fetching rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const groupLevelsForFilter = Array.from(
    new Set(groupsData.map((group) => group.group_name))
  );

  const filteredGroups = groupsData
    .map(group => {
      const filteredPlayers = group.players.filter(player =>
        player.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...group, players: filteredPlayers };
    })
    .filter(group => {
      // Filter by selected group name (level filter)
      const matchesLevelFilter = selectedLevelFilter
        ? group.group_name === selectedLevelFilter
        : true;
      // Only include group if it matches level filter AND has players after search query filter
      return matchesLevelFilter && group.players.length > 0;
    });


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-tennis-green" />
        <p className="ml-2">Loading rankings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-red-600">
        <ShieldAlert className="h-10 w-10 mb-2" />
        <p className="text-lg font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search players..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 tennis-input"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedLevelFilter === null ? "default" : "outline"}
            onClick={() => setSelectedLevelFilter(null)}
            className={selectedLevelFilter === null ? "bg-tennis-green hover:bg-tennis-green-dark text-white" : ""}
            size="sm"
          >
            All Groups
          </Button>
          {groupLevelsForFilter.map((levelName) => (
            <Button
              key={levelName}
              variant={selectedLevelFilter === levelName ? "default" : "outline"}
              onClick={() => setSelectedLevelFilter(levelName)}
              className={selectedLevelFilter === levelName ? "bg-tennis-green hover:bg-tennis-green-dark text-white" : ""}
              size="sm"
            >
              {levelName}
            </Button>
          ))}
        </div>
      </div>

      {filteredGroups.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-8">No players found matching your criteria.</p>
      )}

      {filteredGroups.map((group, groupIndex) => (
        <div key={group.group_id || groupIndex} className="space-y-3">
          <h2 className="text-2xl font-semibold text-tennis-green tracking-tight">
            {group.group_name} (Level {group.group_level})
          </h2>
          <div className="rounded-md border overflow-hidden shadow-sm bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100 transition-colors">
                  <TableHead className="w-16 text-center font-semibold text-gray-700">Rank</TableHead>
                  <TableHead className="font-semibold text-gray-700">Player</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">W/L</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Win %</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Points</TableHead>
                  <TableHead className="w-24 text-right font-semibold text-gray-700">Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.players.map((player, playerIndex) => {
                  const losses = player.matches_played - player.matches_won;
                  const winPercentage = player.matches_played > 0
                    ? (player.matches_won / player.matches_played) * 100
                    : 0;
                  
                  return (
                    <TableRow key={player.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="text-center font-medium text-gray-600">
                        {playerIndex + 1} 
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 ring-1 ring-gray-300">
                            <User className="h-5 w-5" />
                          </div>
                          <span className="font-medium text-gray-800">{player.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-gray-600">
                        {player.matches_won}-{losses < 0 ? 0 : losses}
                      </TableCell>
                      <TableCell className="text-right text-gray-600">
                        {winPercentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-bold text-tennis-green">
                        {player.points}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm" className="text-tennis-green hover:text-tennis-green-dark hover:bg-green-50">
                          <Link to={`/players/${player.id}`}> 
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {group.players.length === 0 && (
              <p className="text-center text-gray-500 py-4">No players in this group match your search.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerRankings;
