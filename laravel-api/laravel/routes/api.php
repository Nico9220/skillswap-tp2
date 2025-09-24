<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\ReviewController;


Route::apiResource('habilidades', AbilityController::class)
    ->parameters(['habilidades' => 'ability']);

Route::apiResource('reseñas', ReviewController::class)
    ->parameters(['reseñas' => 'reseña']);

// Extra:
Route::get('habilidades/{ability}/reseñas', [ReviewController::class, 'byAbility'])
    ->name('habilidades.reseñas');
