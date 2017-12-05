<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function companies()
    {
        return $this->hasMany(Company::class);
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
