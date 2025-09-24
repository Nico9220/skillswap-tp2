<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Ability;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $r)
    {
        // Lista global de reseñas
        return Review::with(['ability:id,nombre', 'user:id,name'])
            ->latest()->get();
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'ability_id' => 'required|exists:abilities,id',
            'user_id'    => 'required|exists:users,id',
            'puntaje'    => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);

        $review = Review::create($data);
        return response()->json($review->load('ability:id,nombre', 'user:id,name'), 201);
    }

    public function show(Review $reseña)
    {
        return $reseña->load('ability:id,nombre', 'user:id,name');
    }

    public function update(Request $r, Review $reseña)
    {
        $data = $r->validate([
            'puntaje'   => 'sometimes|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);

        $reseña->update($data);
        return $reseña->load('ability:id,nombre', 'user:id,name');
    }

    public function destroy(Review $reseña)
    {
        $reseña->delete();
        return response()->noContent();
    }

    // Extra: reseñas por habilidad
    public function byAbility(Ability $ability)
    {
        return $ability->reviews()->with('user:id,name')->latest()->get();
    }
}
