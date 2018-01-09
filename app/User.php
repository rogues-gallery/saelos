<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activities
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Company[] $companies
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Deal[] $deals
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Person[] $people
 * @property-read \App\Team $team
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;
    use HasCustomFieldsTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone',
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

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['team_leader'] = (isset($array['team']) && $array['team']['leader_id'] === $array['id']);

        $array['vector'] = rand(45, 100);

        $array['custom_fields'] = $this->getCustomFieldsAttribute();

        return $array;
    }
}
