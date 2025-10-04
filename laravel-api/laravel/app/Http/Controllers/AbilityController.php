<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use Illuminate\Http\Request;

class AbilityController extends Controller
{
    public function index()
    {
        return Ability::query()
            ->with('user:id,name')
            ->withCount('reviews')
            ->latest()
            ->get();
    }

    public function show(Ability $habilidade)
    {
        return $habilidade
            ->load('user:id,name', 'reviews.user:id,name')
            ->append('promedio_puntaje');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'      => ['required', 'string', 'max:120'],
            'descripcion' => ['nullable', 'string'],
        ]);

        $ability = Ability::create([
            'user_id'     => $request->user()->id,    // ← del usuario autenticado
            'nombre'      => $data['nombre'],
            'descripcion' => $data['descripcion'] ?? null,
        ]);

        return response()->json(
            $ability->fresh()->load('user:id,name')->loadCount('reviews'),
            201
        );
    }

    public function update(Request $request, Ability $habilidade)
    {
        if ($request->user()->id !== $habilidade->user_id) {
            abort(403, 'No autorizado');
        }
        $data = $request->validate([
            'nombre'      => ['sometimes', 'required', 'string', 'max:120'],
            'descripcion' => ['nullable', 'string'],
        ]);

        $habilidade->update($data);

        return $habilidade->fresh()->load('user:id,name')->loadCount('reviews');
    }

    public function destroy(Request $request, Ability $habilidade)
    {
        if ($request->user()->id !== $habilidade->user_id) {
            abort(403, 'No autorizado');
        }
        $habilidade->delete();
        return response()->noContent();
    }
}
