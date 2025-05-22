<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Player;
use App\Models\Game;
use App\Models\Group;
use App\Services\RankingService;
use Illuminate\Support\Collection;
use Mockery; // Ensure Mockery is available

class RankingServiceTest extends TestCase
{
    protected RankingService $rankingService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->rankingService = new RankingService();
    }

    protected function tearDown(): void
    {
        Mockery::close(); // Clean up Mockery expectations
        parent::tearDown();
    }

    /**
     * Helper to create a mock game.
     * @param Player $player The player involved in this game.
     * @param string $status 'played' or 'scheduled'.
     * @param bool $isWinner True if $player is the winner, false otherwise.
     * @param int $player1_id
     * @param int $player2_id
     * @return Mockery\MockInterface|Game
     */
    protected function mockGame(Player $player, string $status, bool $isWinner, int $player1_id, int $player2_id)
    {
        $game = Mockery::mock(Game::class)->makePartial();
        $game->status = $status;
        $game->player1_id = $player1_id;
        $game->player2_id = $player2_id;

        if ($status === 'played') {
            $game->winner_id = $isWinner ? $player->id : ($player->id === $player1_id ? $player2_id : $player1_id);
        } else {
            $game->winner_id = null;
        }
        return $game;
    }

    public function test_calculate_player_points()
    {
        // 1. Setup Player mock
        $player = Mockery::mock(Player::class)->makePartial();
        $player->id = 1; // Assign an ID to the player
        $player->shouldReceive('save')->once()->andReturn(true); // Expect save to be called

        // 2. Setup Games
        // Scenario 1: Player wins a game (status 'played')
        $gameWon = $this->mockGame($player, 'played', true, $player->id, 2);
        // Scenario 2: Player loses a game (status 'played')
        $gameLost = $this->mockGame($player, 'played', false, 3, $player->id);
        // Scenario 3: Player has an unplayed game (status 'scheduled')
        $gameScheduled = $this->mockGame($player, 'scheduled', false, $player->id, 4);
        // Scenario 4: Player wins another game
        $gameWonAgain = $this->mockGame($player, 'played', true, 5, $player->id);

        $games = new Collection([$gameWon, $gameLost, $gameScheduled, $gameWonAgain]);

        // Mock the allGames accessor
        $player->shouldReceive('getAttribute')->with('allGames')->andReturn($games);
        
        // 3. Call the method
        $updatedPlayer = $this->rankingService->calculate_player_points($player);

        // 4. Assertions
        $this->assertEquals(3 + 1 + 3, $updatedPlayer->points, "Points calculation for played games is incorrect."); // 3 for win, 1 for loss, 3 for win
        $this->assertEquals(3, $updatedPlayer->matches_played, "Matches played count is incorrect."); // Two played games, one scheduled
        $this->assertEquals(2, $updatedPlayer->matches_won, "Matches won count is incorrect."); // Two wins
    }


    public function test_process_group_transitions_standard_5_players()
    {
        $group = Mockery::mock(Group::class)->makePartial();
        $group->id = 10;
        $group->level = 2;

        $playersData = [
            ['id' => 1, 'points' => 100, 'group_id' => 10], // Promoted
            ['id' => 2, 'points' => 90, 'group_id' => 10],  // Promoted
            ['id' => 3, 'points' => 80, 'group_id' => 10],  // Stays
            ['id' => 4, 'points' => 70, 'group_id' => 10],  // Demoted
            ['id' => 5, 'points' => 60, 'group_id' => 10],  // Demoted
        ];
        $mockPlayers = new Collection();
        foreach ($playersData as $data) {
            $player = Mockery::mock(Player::class)->makePartial();
            $player->id = $data['id'];
            $player->points = $data['points'];
            $player->group_id = $data['group_id'];
            $player->shouldReceive('save')->andReturn(true); 
            // Mock allGames for calculate_player_points called within update_rankings_for_group
            $player->shouldReceive('getAttribute')->with('allGames')->andReturn(new Collection());
            $mockPlayers->add($player);
        }

        $group->shouldReceive('getAttribute')->with('players')->andReturn($mockPlayers);

        $groupAbove = Mockery::mock(Group::class);
        $groupAbove->id = 9;
        $groupAbove->level = 1;

        $groupBelow = Mockery::mock(Group::class);
        $groupBelow->id = 11;
        $groupBelow->level = 3;

        // Mock static Group::where calls
        Mockery::mock('alias:App\Models\Group')
            ->shouldReceive('where')->with('level', 1)->andReturnSelf()
            ->shouldReceive('first')->andReturn($groupAbove)
            ->shouldReceive('where')->with('level', 3)->andReturnSelf()
            ->shouldReceive('first')->andReturn($groupBelow);
        
        $transitions = $this->rankingService->process_group_transitions($group);

        $this->assertCount(2, $transitions['promoted']);
        $this->assertEquals($groupAbove->id, $mockPlayers[0]->group_id); // Player 1 promoted
        $this->assertEquals($groupAbove->id, $mockPlayers[1]->group_id); // Player 2 promoted
        
        $this->assertCount(1, $transitions['stayed']);
        $this->assertEquals($group->id, $mockPlayers[2]->group_id);    // Player 3 stayed

        $this->assertCount(2, $transitions['demoted']);
        $this->assertEquals($groupBelow->id, $mockPlayers[3]->group_id); // Player 4 demoted
        $this->assertEquals($groupBelow->id, $mockPlayers[4]->group_id); // Player 5 demoted
    }

    public function test_process_group_transitions_top_group()
    {
        $group = Mockery::mock(Group::class)->makePartial();
        $group->id = 9;
        $group->level = 1; // Top level group

        $playersData = [
            ['id' => 1, 'points' => 100, 'group_id' => 9],
            ['id' => 2, 'points' => 90, 'group_id' => 9],
            ['id' => 3, 'points' => 80, 'group_id' => 9],
            ['id' => 4, 'points' => 70, 'group_id' => 9],
            ['id' => 5, 'points' => 60, 'group_id' => 9],
        ];
        $mockPlayers = new Collection();
        foreach ($playersData as $data) {
            $player = Mockery::mock(Player::class)->makePartial();
            $player->id = $data['id'];
            $player->points = $data['points'];
            $player->group_id = $data['group_id'];
            $player->shouldReceive('save')->andReturn(true);
            $player->shouldReceive('getAttribute')->with('allGames')->andReturn(new Collection());
            $mockPlayers->add($player);
        }
        $group->shouldReceive('getAttribute')->with('players')->andReturn($mockPlayers);

        $groupBelow = Mockery::mock(Group::class);
        $groupBelow->id = 10;
        $groupBelow->level = 2;

        Mockery::mock('alias:App\Models\Group')
            ->shouldReceive('where')->with('level', 0)->andReturnSelf() // Group above (level - 1)
            ->shouldReceive('first')->andReturn(null) // No group above
            ->shouldReceive('where')->with('level', 2)->andReturnSelf() // Group below (level + 1)
            ->shouldReceive('first')->andReturn($groupBelow);

        $transitions = $this->rankingService->process_group_transitions($group);

        $this->assertCount(0, $transitions['promoted']); // No promotions from top group
        // Top 2 players stay because there's no group above
        $this->assertContains(['player_id' => 1, 'reason' => 'Top of the highest group.'], $transitions['stayed']);
        $this->assertContains(['player_id' => 2, 'reason' => 'Top of the highest group.'], $transitions['stayed']);
        
        $this->assertEquals($group->id, $mockPlayers[0]->group_id);
        $this->assertEquals($group->id, $mockPlayers[1]->group_id);

        $this->assertCount(2, $transitions['demoted']);
        $this->assertEquals($groupBelow->id, $mockPlayers[3]->group_id);
        $this->assertEquals($groupBelow->id, $mockPlayers[4]->group_id);
    }

    public function test_process_group_transitions_bottom_group()
    {
        $group = Mockery::mock(Group::class)->makePartial();
        $group->id = 11;
        $group->level = 3; // Bottom level group

        $playersData = [
            ['id' => 1, 'points' => 100, 'group_id' => 11],
            ['id' => 2, 'points' => 90, 'group_id' => 11],
            ['id' => 3, 'points' => 80, 'group_id' => 11],
            ['id' => 4, 'points' => 70, 'group_id' => 11],
            ['id' => 5, 'points' => 60, 'group_id' => 11],
        ];
        $mockPlayers = new Collection();
        foreach ($playersData as $data) {
            $player = Mockery::mock(Player::class)->makePartial();
            $player->id = $data['id'];
            $player->points = $data['points'];
            $player->group_id = $data['group_id'];
            $player->shouldReceive('save')->andReturn(true);
            $player->shouldReceive('getAttribute')->with('allGames')->andReturn(new Collection());
            $mockPlayers->add($player);
        }
        $group->shouldReceive('getAttribute')->with('players')->andReturn($mockPlayers);

        $groupAbove = Mockery::mock(Group::class);
        $groupAbove->id = 10;
        $groupAbove->level = 2;

        Mockery::mock('alias:App\Models\Group')
            ->shouldReceive('where')->with('level', 2)->andReturnSelf() // Group above
            ->shouldReceive('first')->andReturn($groupAbove)
            ->shouldReceive('where')->with('level', 4)->andReturnSelf() // Group below
            ->shouldReceive('first')->andReturn(null); // No group below

        $transitions = $this->rankingService->process_group_transitions($group);

        $this->assertCount(2, $transitions['promoted']);
        $this->assertEquals($groupAbove->id, $mockPlayers[0]->group_id);
        $this->assertEquals($groupAbove->id, $mockPlayers[1]->group_id);

        $this->assertCount(0, $transitions['demoted']); // No demotions from bottom group
        // Bottom 2 players stay because there's no group below
        $this->assertContains(['player_id' => 4, 'reason' => 'Bottom of the lowest group.'], $transitions['stayed']);
        $this->assertContains(['player_id' => 5, 'reason' => 'Bottom of the lowest group.'], $transitions['stayed']);
        $this->assertEquals($group->id, $mockPlayers[3]->group_id);
        $this->assertEquals($group->id, $mockPlayers[4]->group_id);
    }
    
    public function test_process_group_transitions_non_5_player_group()
    {
        $group = Mockery::mock(Group::class)->makePartial();
        $group->id = 10;
        $group->level = 2;

        $playersData = [ // Only 3 players
            ['id' => 1, 'points' => 100, 'group_id' => 10],
            ['id' => 2, 'points' => 90, 'group_id' => 10],
            ['id' => 3, 'points' => 80, 'group_id' => 10],
        ];
        $mockPlayers = new Collection();
        foreach ($playersData as $data) {
            $player = Mockery::mock(Player::class)->makePartial();
            $player->id = $data['id'];
            $player->points = $data['points'];
            $player->group_id = $data['group_id'];
            $player->shouldReceive('save')->andReturn(true);
            $player->shouldReceive('getAttribute')->with('allGames')->andReturn(new Collection());
            $mockPlayers->add($player);
        }
        $group->shouldReceive('getAttribute')->with('players')->andReturn($mockPlayers);
        
        // Mock the service to call calculate_player_points for these players
        // This part is tricky as process_group_transitions calls update_rankings_for_group,
        // which then calls calculate_player_points.
        // We've already mocked 'allGames' for each player, so calculate_player_points should run.

        $transitions = $this->rankingService->process_group_transitions($group);

        $this->assertNotEmpty($transitions['errors']);
        $this->assertStringContainsString('currently only processed for groups with exactly 5 players', $transitions['errors'][0]);
        $this->assertCount(0, $transitions['promoted']);
        $this->assertCount(0, $transitions['demoted']);
    }
}
