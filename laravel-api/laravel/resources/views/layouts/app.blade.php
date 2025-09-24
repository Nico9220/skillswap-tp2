<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>SkillSwap Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>

<body class="bg-slate-100 text-slate-900">
    <nav class="bg-white border-b sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="{{ route('demo.index') }}" class="font-semibold">SkillSwap</a>

            <div class="text-sm">
                @auth
                <span class="mr-3 text-slate-600">Hola, <strong>{{ auth()->user()->name }}</strong></span>
                <form method="POST" action="{{ route('logout') }}" class="inline">
                    @csrf
                    <button class="underline">Salir</button>
                </form>
                @else
                <a class="underline mr-3" href="{{ route('login') }}">Entrar</a>
                <a class="underline" href="{{ route('register') }}">Crear cuenta</a>
                @endauth
            </div>
        </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 py-6">
        @if(session('ok'))
        <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">{{ session('ok') }}</div>
        @endif

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