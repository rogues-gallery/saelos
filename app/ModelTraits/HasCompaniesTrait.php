<?php

namespace App\ModelTraits;

use App\Company;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasCompaniesTrait
{
    public function companies():  MorphToMany
    {
        return $this->morphToMany(
            Company::class,
            'entity',
            'company_xref'
        )
            ->withPivot(['primary', 'position']);
    }
}