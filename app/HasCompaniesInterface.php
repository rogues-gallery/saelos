<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

interface HasCompaniesInterface
{
    public function companies() : MorphToMany;
}