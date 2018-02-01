<?php

namespace App\Workflows\Actions;

use Illuminate\Database\Eloquent\Model;

interface ActionInterface
{
    /**
     * Execute this action on the provided Model
     *
     * @param Model $model
     *
     * @return bool
     */
    public function execute(Model $model): bool;
}