<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Group;
use App\Models\Player;
use App\Services\RankingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB; // For potential transactions if needed

class RankingController extends Controller
{
    protected RankingService $rankingService;

    public function __construct(RankingService $rankingService)
    {
        $this->rankingService = $rankingService;
    }

    public function recordGameResult(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'player1_id' => 'required|exists:players,id|different:player2_id',
            'player2_id' => 'required|exists:players,id',
            'winner_id' => 'required|exists:players,id|in:' . $request->input('player1_id') . ',' . $request->input('player2_id'),
            'group_id' => 'required|exists:groups,id',
            // 'played_at' can be implicitly now() or allow submission. Assuming now().
            // 'scheduled_date' and 'status' could also be part of request if game is scheduled first.
            // For simplicity, this endpoint records a game that just finished.
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        try {
            $game = new Game();
            $game->player1_id = $validated['player1_id'];
            $game->player2_id = $validated['player2_id'];
            $game->winner_id = $validated['winner_id'];
            $game->group_id = $validated['group_id'];
            $game->status = 'played';
            $game->played_at = now();
            // If scheduled_date was part of this flow, it could be set here too.
            // $game->scheduled_date = $validated['scheduled_date'] ?? null; 
            $game->save();

            // Update points for both players
            $player1 = Player::find($validated['player1_id']);
            $player2 = Player::find($validated['player2_id']);

            if ($player1) {
                $this->rankingService->calculate_player_points($player1);
            }
            if ($player2) {
                $this->rankingService->calculate_player_points($player2);
            }

            return response()->json([
                'message' => 'Game result recorded successfully.',
                'game' => $game->load(['player1.user', 'player2.user', 'winner.user', 'group']) // Eager load details
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error recording game result.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getGroupRankings(Request $request, $groupId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json(['message' => 'Group not found.'], 404);
        }

        try {
            // The service method already calculates points and sorts players
            $rankedPlayers = $this->rankingService->update_rankings_for_group($group);

            // Eager load user details for each player
            $rankedPlayers->load('user'); 
            // Also ensure other relevant player details are present, which they are by default

            return response()->json([
                'group' => $group->load('games'), // Optional: load games for context
                'rankings' => $rankedPlayers
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching group rankings.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllRankings(Request $request)
    {
        try {
            $groups = Group::orderBy('level', 'asc')->get();
            $allRankings = [];

            foreach ($groups as $group) {
                $rankedPlayers = $this->rankingService->update_rankings_for_group($group);
                $rankedPlayers->load('user'); // Eager load user details

                $allRankings[] = [
                    'group_id' => $group->id,
                    'group_name' => $group->name,
                    'group_level' => $group->level,
                    'players' => $rankedPlayers,
                ];
            }

            return response()->json(['data' => $allRankings], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching all rankings.', 'error' => $e->getMessage()], 500);
        }
    }

    public function runGroupTransitions(Request $request)
    {
        try {
            // It's generally safer to process transitions in some order, e.g., by level.
            // This avoids issues if a player could theoretically be moved multiple times
            // in a single batch run if groups were processed out of order, though
            // the current service logic operates on one group at a time and player state is saved.
            $groups = Group::orderBy('level', 'asc')->get();
            $allTransitionsSummary = [];

            foreach ($groups as $group) {
                $transitions = $this->rankingService->process_group_transitions($group);
                $allTransitionsSummary[] = $transitions; // Append summary for this group
            }

            return response()->json([
                'message' => 'Group transitions processed for all groups.',
                'transitions_summary' => $allTransitionsSummary
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing group transitions.', 'error' => $e->getMessage()], 500);
        }
    }
}
