<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

/*
 | Home mínima (evita el error de Vite). No usa Blade.
*/

Route::get('/', fn() => response()->json(['ok' => true]));

/*
 | (Opcional) Dejar tu demo accesible sin ser la home.
 | Si tu Demo usa Blade con @vite, solo entrá acá si querés probarlo.
*/
Route::get('/demo', [DemoController::class, 'index'])->name('demo.index');
Route::get('/habilidades/{ability}', [DemoController::class, 'show'])->name('demo.show');

/*
 | Rutas con sesión (para la demo con Blade)
*/
Route::middleware('auth')->group(function () {
    Route::post('/habilidades', [DemoController::class, 'storeAbility'])->name('demo.ability.store');
    Route::post('/reseñas',     [DemoController::class, 'storeReview'])->name('demo.review.store');

    Route::get('/dashboard', fn() => redirect()->route('demo.index'))->name('dashboard');

    Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
 | Endpoints para SPA (Next.js) con Sanctum (cookies)
*/
Route::prefix('spa')->group(function () {
    Route::post('/login',    [AuthenticatedSessionController::class, 'store'])->name('spa.login');
    Route::post('/logout',   [AuthenticatedSessionController::class, 'destroy'])->name('spa.logout');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('spa.register');
});

/*
 | Rutas de autenticación de Breeze/Fortify (si mantenés los formularios web)
*/
require __DIR__ . '/auth.php';
