<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasActivitiesTrait
{
    public function activities():  MorphToMany
    {
        return $this->morphToMany(
            Activity::class,
            'entity',
            'activity_entities'
        )
            ->withPivot(['primary'])->orderBy('created_at', 'DESC');
    }
}