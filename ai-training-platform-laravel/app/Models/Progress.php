<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'module_id',
        'module_name',
        'completed',
        'completed_at',
        'xp_earned',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
        'xp_earned' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

