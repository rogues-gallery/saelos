<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

interface HasCompaniesInterface
{
    public function companies() : MorphToMany;
}