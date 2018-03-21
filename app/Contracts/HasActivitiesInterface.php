<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

interface HasActivitiesInterface
{
    public function activities() : MorphToMany;
}