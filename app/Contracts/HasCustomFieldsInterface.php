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
     * @param string $alias
     * @param        $value
     *
     * @return void
     *
     * @throws \InvalidArgumentException
     */
    public function setCustomFieldValue(string $alias, $value): void;

    /**
     * @param $value
     *
     * @return null
     */
    public function assignCustomFields($value);
}