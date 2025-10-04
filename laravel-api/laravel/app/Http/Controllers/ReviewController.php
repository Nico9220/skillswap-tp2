<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::query()->with(['user:id,name', 'ability:id,nombre'])->latest()->get();
    }

    public function show(Review $reseña)
    {
        return $reseña->load(['user:id,name', 'ability:id,nombre']);
    }

    public function store(Request $request)
    {
        // El front manda: { ability_id, puntaje, comentario }
        $data = $request->validate([
            'ability_id' => ['required', 'exists:abilities,id'],
            'puntaje'    => ['required', 'integer', 'min:1', 'max:5'],
            'comentario' => ['nullable', 'string', 'max:1000'],
        ]);

        $review = Review::create([
            'user_id'    => $request->user()->id, // ← de la sesión
            'ability_id' => $data['ability_id'],
            'puntaje'    => $data['puntaje'],
            'comentario' => $data['comentario'] ?? null,
        ]);

        return response()->json($review->load('user:id,name'), 201);
    }

    public function update(Request $request, Review $reseña)
    {
        $data = $request->validate([
            'puntaje'    => ['sometimes', 'required', 'integer', 'min:1', 'max:5'],
            'comentario' => ['nullable', 'string', 'max:1000'],
        ]);

        $reseña->update($data);

        return $reseña->fresh()->load('user:id,name');
    }

    public function destroy(Review $reseña)
    {
        $reseña->delete();
        return response()->noContent();
    }
}
