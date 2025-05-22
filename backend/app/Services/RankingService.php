<?php

namespace App\Services;

use App\Models\Group;
use App\Models\Player;
use App\Models\Game; // Game is used instead of Match

class RankingService
{
    /**
     * Calculate points, matches_played, and matches_won for a given player.
     *
     * @param Player $player
     * @return Player
     */
    public function calculate_player_points(Player $player): Player
    {
        $totalPoints = 0;
        $matchesPlayed = 0;
        $matchesWon = 0;

        // Ensure allGames is accessed correctly, it's an accessor
        $games = $player->allGames;

        foreach ($games as $game) {
            if ($game->status === 'played') {
                $matchesPlayed++;
                if ($game->winner_id === $player->id) {
                    $totalPoints += 3;
                    $matchesWon++;
                } else {
                    // Player participated and lost (or it was a draw, though draw logic isn't specified, assuming 1 point for loss)
                    // Or if winner_id is null but game is played (e.g. draw, if that's possible), this rule might need refinement.
                    // For now, if not winner but played, assume 1 point.
                    $totalPoints += 1;
                }
            }
            // Games not 'played' (e.g., 'scheduled', 'cancelled') contribute 0 points.
        }

        $player->points = $totalPoints;
        $player->matches_played = $matchesPlayed;
        $player->matches_won = $matchesWon;
        $player->save();

        return $player;
    }

    /**
     * Update rankings for all players in a given group.
     *
     * @param Group $group
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function update_rankings_for_group(Group $group): \Illuminate\Database\Eloquent\Collection
    {
        $players = $group->players; // Eloquent relationship loads them

        foreach ($players as $player) {
            $this->calculate_player_points($player);
        }

        // Re-fetch or re-sort. Since calculate_player_points saves, the objects in $players are updated.
        // We need to sort them now.
        return $players->sortByDesc('points')->values(); // values() resets keys for the collection
    }

    /**
     * Process player transitions (promotions/demotions) for a given group.
     *
     * @param Group $group
     * @return array A summary of the transitions.
     */
    public function process_group_transitions(Group $group): array
    {
        $rankedPlayers = $this->update_rankings_for_group($group);
        $playerCount = $rankedPlayers->count();
        $transitions = [
            'group_id' => $group->id,
            'group_level' => $group->level,
            'promoted' => [],
            'demoted' => [],
            'stayed' => [],
            'errors' => [],
        ];

        // For now, strictly apply to 5-player groups as per "ideal" scenario.
        // Modifications can be made later for different group sizes.
        if ($playerCount !== 5) {
            $transitions['errors'][] = "Group transitions are currently only processed for groups with exactly 5 players. This group has {$playerCount} players.";
            // Optionally, one might still attempt to promote/demote the very top/bottom player if playerCount > 0
            // but for strict adherence to "top 2 / bottom 2 from 5", we'll return.
            return $transitions;
        }

        $groupAbove = Group::where('level', $group->level - 1)->first();
        $groupBelow = Group::where('level', $group->level + 1)->first();

        // Promotion for top 2 players
        if ($groupAbove) {
            $playersToPromote = $rankedPlayers->slice(0, 2);
            foreach ($playersToPromote as $player) {
                $player->group_id = $groupAbove->id;
                // $player->points = 0; // Optional: Reset points for the new group/season
                $player->save();
                $transitions['promoted'][] = ['player_id' => $player->id, 'new_group_id' => $groupAbove->id, 'new_group_level' => $groupAbove->level];
            }
        } else {
            // Top group, top 2 players stay (no group above)
            $playersToPromote = $rankedPlayers->slice(0, 2);
            foreach ($playersToPromote as $player) {
                $transitions['stayed'][] = ['player_id' => $player->id, 'reason' => 'Top of the highest group.'];
            }
        }

        // Middle player stays
        $middlePlayer = $rankedPlayers->slice(2, 1)->first();
        if ($middlePlayer) {
            $transitions['stayed'][] = ['player_id' => $middlePlayer->id, 'reason' => 'Middle rank.'];
        }

        // Demotion for bottom 2 players
        if ($groupBelow) {
            $playersToDemote = $rankedPlayers->slice(3, 2); // Players at index 3 and 4
            foreach ($playersToDemote as $player) {
                $player->group_id = $groupBelow->id;
                // $player->points = 0; // Optional: Reset points for the new group/season
                $player->save();
                $transitions['demoted'][] = ['player_id' => $player->id, 'new_group_id' => $groupBelow->id, 'new_group_level' => $groupBelow->level];
            }
        } else {
            // Bottom group, bottom 2 players stay (no group below)
            $playersToDemote = $rankedPlayers->slice(3, 2);
             foreach ($playersToDemote as $player) {
                $transitions['stayed'][] = ['player_id' => $player->id, 'reason' => 'Bottom of the lowest group.'];
            }
        }
        
        if (empty($transitions['promoted']) && empty($transitions['demoted']) && empty($transitions['errors']) && $playerCount === 5) {
             if (!$groupAbove && !$groupBelow) {
                 $transitions['message'] = 'No transitions occurred: Single group system or all players stayed.';
             } else if (!$groupAbove) {
                  $transitions['message'] = 'No promotions: Top group. Some players may have stayed or been demoted if a group below exists.';
             } else if (!$groupBelow) {
                  $transitions['message'] = 'No demotions: Bottom group. Some players may have stayed or been promoted if a group above exists.';
             } else {
                 $transitions['message'] = 'Transitions processed.';
             }
        } else if (empty($transitions['errors'])) {
            $transitions['message'] = 'Transitions processed.';
        }


        return $transitions;
    }
}
