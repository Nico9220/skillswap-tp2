@extends('layouts.app')

@section('content')
<a href="{{ route('demo.index') }}" class="text-sm text-slate-600 hover:underline">← Volver</a>

<div class="mt-3 bg-white p-5 rounded-xl shadow">
    <h1 class="text-2xl font-bold">{{ $ability->nombre }}</h1>
    <p class="mt-1 text-slate-600">{{ $ability->descripcion }}</p>
    <div class="mt-2 text-sm text-slate-500">
        Por: <strong>{{ $ability->user->name ?? 'Usuario' }}</strong> ·
        Reseñas: <strong>{{ $ability->reviews()->count() }}</strong> ·
        Promedio: <strong>{{ $ability->promedio_puntaje }}</strong>/5
    </div>
</div>

<div class="mt-6 grid gap-6 md:grid-cols-3">
    {{-- Formulario de reseña --}}
    <div class="bg-white p-4 rounded-xl shadow md:order-2">
        <h2 class="font-semibold mb-3">Agregar reseña</h2>
        <form action="{{ route('demo.review.store') }}" method="POST" class="grid gap-3">
            @csrf
            <input type="hidden" name="ability_id" value="{{ $ability->id }}">

            <div>
                <label class="block text-sm">Usuario</label>
                <select name="user_id" class="w-full border rounded p-2" required>
                    <option value="">— Elegí un usuario —</option>
                    @foreach($users as $u)
                    <option value="{{ $u->id }}">{{ $u->name }} (ID {{ $u->id }})</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-sm">Puntaje</label>
                <div class="flex gap-2">
                    @for($i=1;$i<=5;$i++)
                        <label class="inline-flex items-center gap-1">
                        <input type="radio" name="puntaje" value="{{ $i }}" required>
                        <span>⭐ {{ $i }}</span>
                        </label>
                        @endfor
                </div>
            </div>

            <div>
                <label class="block text-sm">Comentario</label>
                <textarea name="comentario" class="w-full border rounded p-2" rows="3" placeholder="¡Muy bueno!"></textarea>
            </div>

            <button class="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800">Publicar</button>
        </form>
    </div>

    {{-- Lista de reseñas --}}
    <div class="md:col-span-2">
        <h2 class="font-semibold mb-3">Reseñas</h2>
        <div class="space-y-3">
            @forelse($ability->reviews as $r)
            <div class="bg-white p-4 rounded-xl shadow">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-slate-500">
                        Por <strong>{{ $r->user->name ?? 'Usuario' }}</strong>
                    </div>
                    {{-- Mostrar estrellas --}}
                    <div class="text-sm">
                        @for($i=1;$i<=5;$i++)
                            <span>@if($i <= $r->puntaje) ⭐ @else ☆ @endif</span>
                                @endfor
                    </div>
                </div>
                @if($r->comentario)
                <p class="mt-2 text-slate-700">{{ $r->comentario }}</p>
                @endif
                <div class="mt-2 text-xs text-slate-400">{{ $r->created_at->diffForHumans() }}</div>
            </div>
            @empty
            <p class="text-slate-600">Aún no hay reseñas.</p>
            @endforelse
        </div>
    </div>
</div>
@endsection