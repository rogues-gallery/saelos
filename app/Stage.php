<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Stage
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Opportunity[] $opportunities
 * @mixin \Eloquent
 */
class Stage extends Model
{
    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function userOpportunities()
    {
        return $this->opportunities()->where('user_id', '=', \Auth::user()->id);
    }

    public function teamOpportunities()
    {
        $relation = $this->opportunities();

        $relation->getQuery()
            ->select('opportunities.*')
            ->join('users', 'opportunities.user_id', '=', 'users.id')
            ->where('users.team_id', '=', \Auth::user()->team_id);

        return $relation;
    }
}
