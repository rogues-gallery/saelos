<?php

namespace App;

use App\Contracts\HasCustomFieldsInterface;
use App\ModelTraits\HasCustomFieldsTrait;
use App\ModelTraits\UserSettingsTrait;
use App\ModelTraits\EmailTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[]                                                  $activities
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[]                                       $clients
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Company[]                                                   $companies
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Opportunity[]                                               $opportunities
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Contact[]                                                   $contacts
 * @property-read \App\Team                                                                                                 $team
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[]                                        $tokens
 * @mixin \Eloquent
 */
class User extends Authenticatable implements HasCustomFieldsInterface
{
    use Notifiable, HasApiTokens;
    use HasCustomFieldsTrait;
    use UserSettingsTrait;
    use EmailTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'team_id',
        'username',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function companies()
    {
        return $this->hasMany(Company::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function roleScopeString()
    {
        return $this->roles()->get()->pluck('name')->reduce(function ($carry, $item) {
            return trim(sprintf('%s %s', $carry, $item));
        });
    }

    public function authorizeRoles($roles)
    {
        if (!is_array($roles)) {
            $roles = [$roles];
        }

        return $this->hasAnyRole($roles);
    }

    public function hasAnyRole($roles)
    {
        return $this->roles()->whereIn('name', $roles)->first() !== null;
    }

    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->first() !== null;
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['team_leader'] = (isset($array['team']) && $array['team']['leader_id'] === $array['id']);
        $array['settings'] = $this->getSettings();

        $array['vector'] = rand(45, 100);

        return $array;
    }
}
