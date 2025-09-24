<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Ability;
use App\Models\Review;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(5)->create();
        Ability::factory()->count(8)->create();
        Review::factory()->count(20)->create();
    }
}
