@extends('layouts.app')

@section('content')
<h1 class="text-2xl font-bold mb-4">Habilidades publicadas</h1>

{{-- Búsqueda --}}
<form method="GET" class="mb-4">
    <input type="text" name="q" value="{{ $q }}"
        placeholder="Buscar habilidad..."
        class="border rounded p-2 w-full md:w-80">
</form>

{{-- Crear habilidad --}}
<div class="mb-8 bg-white p-4 rounded-xl shadow">
    <h2 class="font-semibold mb-3">Nueva habilidad</h2>
    <form action="{{ route('demo.ability.store') }}" method="POST" class="grid gap-3 md:grid-cols-3">
        @csrf
        <div>
            <label class="block text-sm">Usuario</label>
            <select name="user_id" class="w-full border rounded p-2" required>
                <option value="">— Elegí un usuario —</option>
                @foreach($users as $u)
                <option value="{{ $u->id }}">{{ $u->name }} (ID {{ $u->id }})</option>
                @endforeach
            </select>
        </div>
        <div class="md:col-span-2">
            <label class="block text-sm">Nombre</label>
            <input name="nombre" class="w-full border rounded p-2" placeholder="Clases de guitarra" required>
        </div>
        <div class="md:col-span-3">
            <label class="block text-sm">Descripción</label>
            <textarea name="descripcion" class="w-full border rounded p-2" rows="2" placeholder="Para principiantes"></textarea>
        </div>
        <div class="md:col-span-3">
            <button class="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800">Guardar</button>
        </div>
    </form>
</div>

{{-- Listado --}}
<div class="grid gap-4 md:grid-cols-2">
    @forelse($abilities as $a)
    <a href="{{ route('demo.show', $a) }}" class="block bg-white p-4 rounded-xl shadow hover:shadow-md transition">
        <div class="flex items-start justify-between">
            <h3 class="text-lg font-semibold">{{ $a->nombre }}</h3>
            <span class="text-xs bg-slate-100 px-2 py-1 rounded">{{ $a->reviews_count }} reseñas</span>
        </div>
        <p class="text-sm text-slate-600 mt-1">{{ $a->descripcion }}</p>
        <div class="mt-3 text-sm text-slate-500">
            Por: <strong>{{ $a->user->name ?? 'Usuario' }}</strong> ·
            Promedio: <strong>{{ $a->promedio_puntaje }}</strong>/5
        </div>
    </a>
    @empty
    <p>No hay habilidades aún.</p>
    @endforelse
</div>

{{-- Paginación --}}
<div class="mt-6">
    {{ $abilities->links() }}
</div>
@endsection