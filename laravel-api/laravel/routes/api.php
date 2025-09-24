<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\ReviewController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('habilidades', AbilityController::class)->only(['index', 'show']);
Route::apiResource('reseñas', ReviewController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('habilidades', AbilityController::class)->except(['index', 'show']);
    Route::apiResource('reseñas', ReviewController::class)->except(['index', 'show']);
});
