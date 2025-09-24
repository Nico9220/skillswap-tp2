<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\Ability;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'ability_id' => Ability::inRandomOrder()->value('id') ?? Ability::factory(),
            'user_id'    => User::inRandomOrder()->value('id') ?? User::factory(),
            'puntaje'    => fake()->numberBetween(1, 5),
            'comentario' => fake()->optional()->sentence(15),
        ];
    }
}
