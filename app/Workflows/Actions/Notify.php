<?php

namespace App\Workflows\Actions;

use App\Notifications\WorkflowNotification;
use App\User;
use App\WorkflowAction;
use Illuminate\Database\Eloquent\Model;

class Notify implements ActionInterface
{
    /**
     * @param Model $model
     * @param array $details
     *
     * @return bool
     */
    public function execute(Model $model, array $details = []): bool
    {
        $user = User::find($details['user_id']);

        $user->notify(new WorkflowNotification($details['message']));

        return true;
    }

    public function updateActionDetails(WorkflowAction $action): bool
    {
        return true;
    }


}