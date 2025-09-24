<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function index()
    {
        // Trae habilidades con autor, promedio y cantidad de reseñas
        $abilities = Ability::with('user')->withCount('reviews')->latest()->get();
        return view('demo.index', compact('abilities'));
    }

    public function show(Ability $ability)
    {
        $ability->load(['user', 'reviews.user']); // autor de la habilidad y autores de reseñas
        return view('demo.show', compact('ability'));
    }

    public function storeAbility(Request $r)
    {
        $data = $r->validate([
            'user_id'     => 'required|exists:users,id',
            'nombre'      => 'required|string|max:120',
            'descripcion' => 'nullable|string',
        ]);

        $ability = Ability::create($data);
        return redirect()->route('demo.show', $ability)->with('ok', 'Habilidad creada.');
    }

    public function storeReview(Request $r)
    {
        $data = $r->validate([
            'ability_id' => 'required|exists:abilities,id',
            'user_id'    => 'required|exists:users,id',
            'puntaje'    => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);

        Review::create($data);
        return back()->with('ok', 'Reseña creada.');
    }
}
