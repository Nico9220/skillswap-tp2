<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProfileController;

// Home de demo + show de habilidad (si las usás desde Blade o para pruebas)
Route::get('/', [DemoController::class, 'index'])->name('demo.index');
Route::get('/habilidades/{ability}', [DemoController::class, 'show'])->name('demo.show');

// Rutas que requieren sesión (cuando navegás con Blade / demo)
Route::middleware('auth')->group(function () {
    Route::post('/habilidades', [DemoController::class, 'storeAbility'])->name('demo.ability.store');
    Route::post('/reseñas',     [DemoController::class, 'storeReview'])->name('demo.review.store');

    // Opcional: que el dashboard de Breeze redirija a tu Home
    Route::get('/dashboard', fn() => redirect()->route('demo.index'))->name('dashboard');

    // Perfil (propio de Breeze)
    Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Endpoints para SPA (Next.js) con Sanctum: login / logout / register
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::prefix('spa')->group(function () {
    Route::post('/login',    [AuthenticatedSessionController::class, 'store'])->name('spa.login');
    Route::post('/logout',   [AuthenticatedSessionController::class, 'destroy'])->name('spa.logout');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('spa.register');
});

require __DIR__ . '/auth.php';
