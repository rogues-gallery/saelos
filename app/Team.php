<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function deals()
    {
        return $this->hasManyThrough(Deal::class, User::class);
    }

    public function activities()
    {
        return $this->hasManyThrough(Activity::class, User::class);
    }

    public function leader()
    {
        return $this->belongsTo(User::class);
    }
}
