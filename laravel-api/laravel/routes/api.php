<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\AbilityController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SoapController;
use App\Http\Controllers\IntegrationsController;


// ¿PHP resuelve DNS?
Route::get('/debug/dns', function () {
    return response()->json([
        'eva_ip'    => gethostbyname('api.eva.pingutil.com'),
        'httpbin_ip' => gethostbyname('httpbin.org'),
    ]);
});

// ¿Sale a Internet con otro host?
Route::get('/debug/httpbin', function () {
    $r = Http::timeout(8)->get('https://httpbin.org/get');
    return ['ok' => $r->ok(), 'status' => $r->status()];
});


/*
 | Sonda: probar salida a Internet con EVA (SIN auth).
 | http://127.0.0.1:8000/api/debug/eva?email=throwaway@mailinator.com
*/

Route::get('/debug/eva', function (Request $r) {
    $email = $r->query('email', 'throwaway@mailinator.com');

    $resp = Http::timeout(8)
        ->acceptJson()
        ->get('https://api.eva.pingutil.com/email', ['email' => $email]);

    return response()->json([
        'ok'     => $resp->ok(),
        'status' => $resp->status(),
        'json'   => $resp->json(),
    ], $resp->status());
})->withoutMiddleware(['auth', 'auth:sanctum']);

/*
 | Integraciones (APIs externas usadas en el TP)
*/
Route::prefix('integraciones')->group(function () {
    Route::get('validar-email', [IntegrationsController::class, 'validarEmail'])
        ->withoutMiddleware(['auth', 'auth:sanctum']);
    Route::get('sugerir-habilidades', [IntegrationsController::class, 'sugerirHabilidades'])
        ->withoutMiddleware(['auth', 'auth:sanctum']);
});

/*
 | Usuarios (ejemplo simple)
*/
Route::get('/users', [UserController::class, 'index']);

/*
 | Sesión actual (SPA puede chequearla)
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/session', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'user' => $user ? $user->only(['id', 'name', 'email']) : null,
    ]);
});

/*
 | Públicas (listado/detalle)
*/
Route::apiResource('habilidades', AbilityController::class)->only(['index', 'show']);
Route::apiResource('reseñas',     ReviewController::class)->only(['index', 'show']);

/*
 | Protegidas (crear/editar/borrar)
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('habilidades', AbilityController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('reseñas',     ReviewController::class)->only(['store', 'update', 'destroy']);
});

Route::get('/usuarios', [SoapController::class, 'usuarios']);