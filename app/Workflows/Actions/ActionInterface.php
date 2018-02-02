<?php

namespace App\Workflows\Actions;

use Illuminate\Database\Eloquent\Model;

interface ActionInterface
{
    /**
     * Execute this action on the provided Model
     *
     * @param Model $model
     * @param array $details
     *
     * @return bool
     */
    public function execute(Model $model, array $details = []): bool;
}