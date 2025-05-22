<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Group;
use App\Models\Player;
use App\Models\Game;

class RankingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_record_game_result_api_valid_data()
    {
        $group = Group::factory()->create();
        $player1 = Player::factory()->create(['group_id' => $group->id]);
        $player2 = Player::factory()->create(['group_id' => $group->id]);

        $gameData = [
            'player1_id' => $player1->id,
            'player2_id' => $player2->id,
            'winner_id' => $player1->id,
            'group_id' => $group->id,
        ];

        $response = $this->postJson('/api/v1/games', $gameData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'game' => ['id', 'player1_id', 'player2_id', 'winner_id', 'group_id', 'status', 'played_at']
            ])
            ->assertJsonFragment(['winner_id' => $player1->id]);

        $this->assertDatabaseHas('games', [
            'player1_id' => $player1->id,
            'player2_id' => $player2->id,
            'winner_id' => $player1->id,
            'group_id' => $group->id,
            'status' => 'played',
        ]);

        // Check if player points were updated (Player 1 won, should have 3 points)
        // Player 2 lost, should have 1 point
        $this->assertDatabaseHas('players', ['id' => $player1->id, 'points' => 3, 'matches_played' => 1, 'matches_won' => 1]);
        $this->assertDatabaseHas('players', ['id' => $player2->id, 'points' => 1, 'matches_played' => 1, 'matches_won' => 0]);
    }

    public function test_record_game_result_api_invalid_data()
    {
        $response = $this->postJson('/api/v1/games', []);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['player1_id', 'player2_id', 'winner_id', 'group_id']);

        // Test winner_id not one of player1_id or player2_id
        $player1 = Player::factory()->create();
        $player2 = Player::factory()->create();
        $player3_winner_invalid = Player::factory()->create();
        $group = Group::factory()->create();

        $invalidWinnerData = [
            'player1_id' => $player1->id,
            'player2_id' => $player2->id,
            'winner_id' => $player3_winner_invalid->id, // Invalid winner
            'group_id' => $group->id,
        ];
        $response = $this->postJson('/api/v1/games', $invalidWinnerData);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['winner_id']);
            
        // Test player1_id and player2_id are the same
        $samePlayerData = [
            'player1_id' => $player1->id,
            'player2_id' => $player1->id, // Same as player1
            'winner_id' => $player1->id, 
            'group_id' => $group->id,
        ];
        $response = $this->postJson('/api/v1/games', $samePlayerData);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['player1_id']); // 'player1_id must be different from player2_id'
    }

    public function test_get_group_rankings_api()
    {
        $group = Group::factory()->create();
        // Create players with varying points by creating played games
        $player1 = Player::factory()->create(['group_id' => $group->id, 'points' => 0]); // Will have 3 points
        $player2 = Player::factory()->create(['group_id' => $group->id, 'points' => 0]); // Will have 1 point
        $player3 = Player::factory()->create(['group_id' => $group->id, 'points' => 5]);  // Will remain 5, no game

        // Record a game to trigger point calculation by RankingService via Controller
         $this->postJson('/api/v1/games', [
            'player1_id' => $player1->id,
            'player2_id' => $player2->id,
            'winner_id' => $player1->id,
            'group_id' => $group->id,
        ]);
        
        // Refresh models to get updated points
        $player1->refresh();
        $player2->refresh();

        $response = $this->getJson("/api/v1/rankings/group/{$group->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'group' => ['id', 'name', 'level', 'games'],
                'rankings' => [
                    '*' => ['id', 'user_id', 'group_id', 'points', 'matches_played', 'matches_won', 'user']
                ]
            ])
            ->assertJsonPath('rankings.0.id', $player3->id) // Highest points (5)
            ->assertJsonPath('rankings.1.id', $player1->id) // Second highest (3)
            ->assertJsonPath('rankings.2.id', $player2->id); // Lowest (1)
            
        // Test with non-existent group ID
        $response = $this->getJson('/api/v1/rankings/group/9999');
        $response->assertStatus(404);
    }

    public function test_get_all_rankings_api()
    {
        $group1 = Group::factory()->create(['level' => 1]);
        $playerG1P1 = Player::factory()->create(['group_id' => $group1->id, 'points' => 10]);
        $playerG1P2 = Player::factory()->create(['group_id' => $group1->id, 'points' => 20]);

        $group2 = Group::factory()->create(['level' => 2]);
        $playerG2P1 = Player::factory()->create(['group_id' => $group2->id, 'points' => 5]);

        // Trigger point calculation by calling the endpoint that uses the service
        // (or by manually creating games and calling the record endpoint if necessary)
        // For simplicity, we'll assume the points set by factory are what we test against for order
        // as get_group_rankings_api already tests the point update logic.

        $response = $this->getJson('/api/v1/rankings/all');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'group_id', 
                        'group_name', 
                        'group_level', 
                        'players' => [
                            '*' => ['id', 'user_id', 'points', 'user']
                        ]
                    ]
                ]
            ])
            ->assertJsonPath('data.0.group_id', $group1->id)
            ->assertJsonPath('data.0.players.0.id', $playerG1P2->id) // playerG1P2 has 20 points
            ->assertJsonPath('data.0.players.1.id', $playerG1P1->id) // playerG1P1 has 10 points
            ->assertJsonPath('data.1.group_id', $group2->id)
            ->assertJsonPath('data.1.players.0.id', $playerG2P1->id); // playerG2P1 has 5 points
    }

    public function test_run_group_transitions_api()
    {
        // Setup a multi-group scenario for transitions
        $groupTop = Group::factory()->create(['level' => 1, 'name' => 'Top Group']);
        $groupMiddle = Group::factory()->create(['level' => 2, 'name' => 'Middle Group']);
        $groupBottom = Group::factory()->create(['level' => 3, 'name' => 'Bottom Group']);

        // Create 5 players for the middle group
        $playersMiddle = Player::factory()->count(5)->sequence(
            ['points' => 100], // Promote
            ['points' => 90],  // Promote
            ['points' => 80],  // Stay
            ['points' => 70],  // Demote
            ['points' => 60]   // Demote
        )->create(['group_id' => $groupMiddle->id]);

        // Players for top and bottom groups (to ensure they exist for transitions)
        Player::factory()->count(3)->create(['group_id' => $groupTop->id]);
        Player::factory()->count(3)->create(['group_id' => $groupBottom->id]);

        // Call the endpoint to process transitions
        $response = $this->postJson('/api/v1/groups/process-transitions');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'transitions_summary' => [
                    '*' => ['group_id', 'group_level', 'promoted', 'demoted', 'stayed', 'errors']
                ]
            ]);
        
        // Assertions for player movements for the middle group
        // Player 1 (ID based on creation sequence if not specified) should be promoted to groupTop
        $this->assertDatabaseHas('players', ['id' => $playersMiddle[0]->id, 'group_id' => $groupTop->id]);
        $this->assertDatabaseHas('players', ['id' => $playersMiddle[1]->id, 'group_id' => $groupTop->id]);
        
        // Player 3 should stay in groupMiddle
        $this->assertDatabaseHas('players', ['id' => $playersMiddle[2]->id, 'group_id' => $groupMiddle->id]);
        
        // Player 4 and 5 should be demoted to groupBottom
        $this->assertDatabaseHas('players', ['id' => $playersMiddle[3]->id, 'group_id' => $groupBottom->id]);
        $this->assertDatabaseHas('players', ['id' => $playersMiddle[4]->id, 'group_id' => $groupBottom->id]);

        // Check response summary for the middle group
        $summaryForMiddleGroup = collect($response->json('transitions_summary'))->firstWhere('group_id', $groupMiddle->id);
        $this->assertCount(2, $summaryForMiddleGroup['promoted']);
        $this->assertCount(1, $summaryForMiddleGroup['stayed']); // The middle player
        $this->assertCount(2, $summaryForMiddleGroup['demoted']);
    }
}
