<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * App\Team
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[]    $activities
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Opportunity[] $opportunities
 * @property-read \App\User                                                   $leader
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[]        $users
 * @mixin \Eloquent
 */
class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
        'leader_id'
    ];

    protected $guarded = [
        'users'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function opportunities()
    {
        return $this->hasManyThrough(Opportunity::class, User::class);
    }

    public function activities()
    {
        return $this->hasManyThrough(Activity::class, User::class);
    }

    public function leader()
    {
        return $this->belongsTo(User::class);
    }

    public function syncUsers(array $users)
    {
        $children = $this->users;
        $users = collect($users);

        $deleted = $children->filter(function ($child) use ($users) {
            return empty($users->where('id', $child->id)->first());
        });

        $deleted->map(function ($child) {
            $child->team_id = null;
            $child->save();
        });

        $added = $users->filter(function ($user) use ($deleted, $children) {
            return empty($deleted->contains('id', $user['id']))
                && empty($children->contains('id', $user['id']));
        });

        $added->map(function ($user) use ($children) {
            $user = User::find($user['id']);
            $user->team_id = $this->id;
            $user->save();
        });
    }
}
