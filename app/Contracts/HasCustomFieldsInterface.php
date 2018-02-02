<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\MorphMany;

interface HasCustomFieldsInterface
{
    /**
     * @return MorphMany
     */
    public function customFields(): MorphMany;

    /**
     * @param $value
     *
     * @return null
     */
    public function assignCustomFields($value);
}