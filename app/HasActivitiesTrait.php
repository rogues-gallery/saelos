<?php

namespace App;

trait HasActivitiesTrait
{
    public function activities()
    {
        return $this->morphMany(Activity::class, 'entity');
    }
}