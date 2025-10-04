<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
 | Públicas (listado/detalle)
*/
Route::apiResource('habilidades', AbilityController::class)->only(['index', 'show']);
Route::apiResource('reseñas', ReviewController::class)->only(['index', 'show']);

/*
 | Protegidas (crear/editar/borrar)
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('habilidades', AbilityController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('reseñas', ReviewController::class)->only(['store', 'update', 'destroy']);
});
