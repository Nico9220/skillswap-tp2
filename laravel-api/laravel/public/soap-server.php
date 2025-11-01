<?php

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

// Cargar la app de Laravel
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Inicializar el kernel para habilitar facades (como DB)
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

class SoapService
{
    public function getUsuarios()
    {
        // ahora DB::table() funciona correctamente
        $usuarios = DB::table('users')->select('id', 'name', 'email')->get();
        return json_encode($usuarios);
    }
}

// Crear el servidor SOAP
$server = new SoapServer(null, [
    'uri' => 'http://localhost:8000/soap-server.php'
]);
$server->setClass(SoapService::class);
$server->handle();
