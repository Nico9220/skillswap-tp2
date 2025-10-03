<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProfileController;

Route::get('/', [DemoController::class, 'index'])->name('demo.index');
Route::get('/habilidades/{ability}', [DemoController::class, 'show'])->name('demo.show');

Route::middleware('auth')->group(function () {
    Route::post('/habilidades', [DemoController::class, 'storeAbility'])->name('demo.ability.store');
    Route::post('/reseñas', [DemoController::class, 'storeReview'])->name('demo.review.store');

    // opcional: que el dashboard de Breeze vaya a tu Home
    Route::get('/dashboard', fn() => redirect()->route('demo.index'))->name('dashboard');

    // rutas de perfil que agrega Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::post('/spa/login',  [AuthenticatedSessionController::class, 'store'])
    ->name('spa.login');
Route::post('/spa/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('spa.logout');


require __DIR__ . '/auth.php';
