<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class IntegrationsController extends Controller
{
    // GET /api/integraciones/validar-email?email=...
    public function validarEmail(Request $r)
    {
        $r->validate(['email' => 'required|email']);

        $email  = $r->query('email');
        $domain = strtolower(substr(strrchr($email, '@'), 1) ?: '');

        // 1) Dominio desechable vía Kickbox Open (sin API key)
        $disposable = null;
        try {
            $kb = Http::timeout(8)->get("https://open.kickbox.com/v1/disposable/{$domain}");
            if ($kb->ok()) {
                $disposable = (bool) data_get($kb->json(), 'disposable');
            }
        } catch (\Throwable $e) {
            // si falla, seguimos con checks locales
        }

        // 2) Checks locales
        $localDisposableList = [
            'mailinator.com',
            'yopmail.com',
            'guerrillamail.com',
            '10minutemail.com',
            'tempmail.com',
            'temp-mail.org',
            'trashmail.com',
            'sharklasers.com',
            'getnada.com'
        ];
        $localDisposable = in_array($domain, $localDisposableList, true);
        $mxFound = checkdnsrr($domain, 'MX') || checkdnsrr($domain, 'A');

        // Resultado combinado
        return response()->json([
            'ok'          => true,
            'domain'      => $domain,
            'kb_disposable' => $disposable,       // puede ser true/false/null si falló
            'local_disposable' => $localDisposable,
            'mx_found'    => (bool) $mxFound,
            'final_disposable' => ($disposable === true) || $localDisposable,
            'deliverable_guess' => $mxFound && (($disposable === false) && !$localDisposable),
        ]);
    }

    // GET /api/integraciones/sugerir-habilidades?q=java
    public function sugerirHabilidades(Request $r)
    {
        $q = trim((string) $r->query('q', ''));
        if ($q === '') return response()->json([]);

        $res = Http::timeout(8)->get('https://api.datamuse.com/sug', ['s' => $q]);
        if ($res->failed()) return response()->json([]);

        // devolvemos sólo los textos
        return response()->json(collect($res->json())->pluck('word')->take(10)->values());
    }
}
