<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'email',
        'email_verified_at',
        'image',
        'level',
        'xp',
        'selected_class',
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'level' => 'integer',
        'xp' => 'integer',
    ];

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}

