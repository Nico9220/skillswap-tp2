<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class DemoController extends Controller
{
    // Home: listado con búsqueda y paginación + dropdown de usuarios
    public function index(Request $r)
    {
        $q = $r->string('q');

        $abilities = Ability::with('user')
            ->withCount('reviews')
            ->when($q, fn($qq) => $qq->where('nombre', 'like', "%{$q}%"))
            ->latest()
            ->paginate(8)
            ->withQueryString();

        $users = User::select('id', 'name')->orderBy('name')->get();

        return view('demo.index', compact('abilities', 'users', 'q'));
    }

    // Detalle: carga reseñas y dropdown de usuarios
    public function show(Ability $ability)
    {
        $ability->load(['user', 'reviews.user']);
        $users = User::select('id', 'name')->orderBy('name')->get();
        return view('demo.show', compact('ability', 'users'));
    }

    // Crear habilidad (con mensajes de validación)
    public function storeAbility(Request $r)
    {
        $messages = [
            'user_id.required' => 'Elegí un usuario.',
            'nombre.required'  => 'Poné un nombre para la habilidad.',
        ];

        $data = $r->validate([
            'user_id'     => 'required|exists:users,id',
            'nombre'      => 'required|string|max:120',
            'descripcion' => 'nullable|string',
        ], $messages);

        $ability = Ability::create($data);
        return redirect()->route('demo.show', $ability)->with('ok', 'Habilidad creada.');
    }

    // Crear reseña (con mensajes + rango 1..5)
    public function storeReview(Request $r)
    {
        $messages = [
            'user_id.required' => 'Elegí un usuario para la reseña.',
            'puntaje.min'      => 'El puntaje debe ser entre 1 y 5.',
            'puntaje.max'      => 'El puntaje debe ser entre 1 y 5.',
        ];

        $data = $r->validate([
            'ability_id' => 'required|exists:abilities,id',
            'user_id'    => 'required|exists:users,id',
            'puntaje'    => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ], $messages);

        Review::create($data);
        return back()->with('ok', 'Reseña creada.');
    }
}
