<?php

namespace App\Http\Controllers;

use SoapClient;

class SoapController extends Controller
{
    public function usuarios()
    {
        $client = new SoapClient(null, [
            'location' => 'http://localhost:8081/soap-server.php',
            'uri' => 'http://localhost:8081/soap-server.php',
        ]);

        $response = $client->getUsuarios();
        return response()->json(json_decode($response));
    }
}
