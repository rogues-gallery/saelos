<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->user->team();
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function people()
    {
        return $this->belongsToMany(Person::class, 'deal_person');
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
