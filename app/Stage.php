<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    public function deals()
    {
        return $this->hasMany(Deal::class);
    }

    public function userDeals()
    {
        return $this->deals()->where('user_id', '=', \Auth::user()->id);
    }

    public function teamDeals()
    {
        $relation = $this->deals();

        $relation->getQuery()
            ->select('deals.*')
            ->join('users', 'deals.user_id', '=', 'users.id')
            ->where('users.team_id', '=', \Auth::user()->team_id);

        return $relation;
    }
}
