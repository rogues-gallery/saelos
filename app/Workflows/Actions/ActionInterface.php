<?php

namespace App\Workflows\Actions;

use App\WorkflowAction;
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

    /**
     * Update the action details based on the execution of the action.
     *
     * @param WorkflowAction $action
     *
     * @return bool
     */
    public function updateActionDetails(WorkflowAction $action): bool;
}