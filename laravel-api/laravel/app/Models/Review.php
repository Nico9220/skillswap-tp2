<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'ability_id',
        'user_id',
        'puntaje',
        'comentario',
    ];

    protected $casts = [
        'id'         => 'integer',
        'ability_id' => 'integer',
        'user_id'    => 'integer',
        'puntaje'    => 'integer',
    ];

    // Relaciones
    public function ability()
    {
        return $this->belongsTo(Ability::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
