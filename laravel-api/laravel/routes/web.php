<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;

Route::get('/', [DemoController::class, 'index'])->name('demo.index');
Route::get('/habilidades/{ability}', [DemoController::class, 'show'])->name('demo.show');
Route::post('/habilidades', [DemoController::class, 'storeAbility'])->name('demo.ability.store');
Route::post('/reseñas', [DemoController::class, 'storeReview'])->name('demo.review.store');


require __DIR__ . '/auth.php';
