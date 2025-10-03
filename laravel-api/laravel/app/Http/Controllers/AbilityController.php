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
            'user_id'     => 'required|exists:users,id',
            'nombre'      => 'required|string|max:120',
            'descripcion' => 'nullable|string',
        ]);

        $ability = Ability::create($data);

        return response()->json($ability->fresh(), 201);
    }

    public function update(Request $request, Ability $habilidade)
    {
        $data = $request->validate([
            'nombre'      => 'sometimes|required|string|max:120',
            'descripcion' => 'nullable|string',
        ]);

        $habilidade->update($data);

        return $habilidade->fresh();
    }

    public function destroy(Ability $habilidade)
    {
        $habilidade->delete();

        return response()->noContent();
    }
}
