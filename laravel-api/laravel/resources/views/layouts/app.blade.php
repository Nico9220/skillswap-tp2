<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>SkillSwap Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-slate-100 text-slate-900">
    <nav class="bg-white border-b sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="{{ route('demo.index') }}" class="font-semibold">SkillSwap</a>
            <span class="text-sm text-slate-500">Demo Laravel</span>
        </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 py-6">
        @if(session('ok'))
        <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">{{ session('ok') }}</div>
        @endif

        {{-- NUEVO: errores de validación --}}
        @if($errors->any())
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
            <ul class="list-disc list-inside">
                @foreach($errors->all() as $e) <li>{{ $e }}</li> @endforeach
            </ul>
        </div>
        @endif

        @yield('content')
    </main>

    <footer class="py-8 text-center text-xs text-slate-500">
        © {{ date('Y') }} SkillSwap (TP2 – CMS & Frameworks)
    </footer>
</body>

</html>