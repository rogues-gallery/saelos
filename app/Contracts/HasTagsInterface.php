<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

interface HasTagsInterface
{
    public function tags() : MorphToMany;
}