<?php

namespace App\ModelTraits;

use App\Activity;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasActivitiesTrait
{
    public function activities():  MorphToMany
    {
        return $this->morphToMany(
            Activity::class,
            'entity',
            'activity_xref'
        )
            ->withPivot(['primary'])->orderBy('created_at', 'DESC');
    }
}