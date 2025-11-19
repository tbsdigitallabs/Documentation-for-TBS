<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'type',
        'provider',
        'provider_account_id',
        'refresh_token',
        'access_token',
        'expires_at',
        'token_type',
        'scope',
        'id_token',
        'session_state',
    ];

    protected $casts = [
        'expires_at' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

