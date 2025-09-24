<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    use HasFactory;

    // Campos asignables en masa
    protected $fillable = [
        'user_id',
        'nombre',
        'descripcion',
    ];

    // Casteos útiles
    protected $casts = [
        'id'      => 'integer',
        'user_id' => 'integer',
    ];

    // Carga automática (opcional, útil para la API)
    protected $with = ['user'];
    protected $withCount = ['reviews'];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Accesor: promedio de puntaje (se agrega al JSON)
    protected $appends = ['promedio_puntaje'];

    public function getPromedioPuntajeAttribute(): float
    {
        // Usa la relación para evitar problemas cuando no hay reseñas
        $avg = $this->reviews()->avg('puntaje');
        return $avg ? round((float) $avg, 2) : 0.0;
    }
}
