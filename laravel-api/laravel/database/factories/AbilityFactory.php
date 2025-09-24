<?php

namespace Database\Factories;

use App\Models\Ability;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AbilityFactory extends Factory
{
    protected $model = Ability::class;

    public function definition(): array
    {
        return [
            'user_id'    => User::inRandomOrder()->value('id') ?? User::factory(),
            'nombre'     => fake()->unique()->jobTitle(),
            'descripcion' => fake()->optional()->sentence(12),
        ];
    }
}
