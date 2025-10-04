<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'ability_id' => ['required', 'integer', 'exists:abilities,id'],
            'puntaje'    => ['required', 'integer', 'between:1,5'],
            'comentario' => ['nullable', 'string', 'max:1000'],
        ]);

        $ability = Ability::findOrFail($data['ability_id']);

        // ❌ no reseñar la propia habilidad
        if ($ability->user_id === $request->user()->id) {
            return response()->json([
                'message' => 'No podés reseñar tu propia habilidad.',
            ], 422);
        }

        // ❌ no reseñar dos veces el mismo curso
        $yaExiste = Review::where('ability_id', $ability->id)
            ->where('user_id', $request->user()->id)
            ->exists();

        if ($yaExiste) {
            return response()->json([
                'message' => 'Ya dejaste una reseña para este curso.',
            ], 422);
        }

        $review = Review::create([
            'ability_id' => $ability->id,
            'user_id'    => $request->user()->id,
            'puntaje'    => $data['puntaje'],
            'comentario' => $data['comentario'] ?? null,
        ]);

        return response()->json($review->load('user:id,name'), 201);
    }
}
