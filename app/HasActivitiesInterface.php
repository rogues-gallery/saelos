<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

interface HasActivitiesInterface
{
    public function activities() : MorphToMany;
}