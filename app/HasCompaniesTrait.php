<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasCompaniesTrait
{
    public function companies():  MorphToMany
    {
        return $this->morphToMany(
            Company::class,
            'entity',
            'company_entities'
        )
            ->withPivot(['primary']);
    }
}