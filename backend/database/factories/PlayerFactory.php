<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlayerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Player::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'group_id' => Group::factory(),
            'points' => $this->faker->numberBetween(0, 3000),
            'matches_played' => $this->faker->numberBetween(0, 100),
            'matches_won' => function (array $attributes) {
                // Ensure matches_won is not greater than matches_played
                return $this->faker->numberBetween(0, $attributes['matches_played']);
            },
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Player $player) {
            // If you need to do something after a player is created, do it here.
        });
    }
}
