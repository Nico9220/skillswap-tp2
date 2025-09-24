<?php

namespace App\Http\Controllers;

use App\Models\Ability;
use Illuminate\Http\Request;

class AbilityController extends Controller
{
    public function index()
    {
        // trae user, reviews_count y promedio_puntaje por el $with / $withCount / appends del modelo
        return Ability::query()->latest()->get();
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'user_id'     => 'required|exists:users,id',
            'nombre'      => 'required|string|max:120',
            'descripcion' => 'nullable|string',
        ]);

        $ability = Ability::create($data);
        return response()->json($ability->fresh(), 201);
    }

    public function show(Ability $habilidade) // tip: Laravel pluraliza en ruta; param se llama {habilidade}
    {
        // $habilidade ya viene con relaciones por $with
        return $habilidade->load('reviews.user:id,name');
    }

    public function update(Request $r, Ability $habilidade)
    {
        $data = $r->validate([
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
