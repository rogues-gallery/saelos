<?php

namespace App\Workflows\Actions;

use App\User;
use App\WorkflowAction;
use Illuminate\Database\Eloquent\Model;

class Email implements ActionInterface
{
    /**
     * @param Model $model
     * @param array $details
     *
     * @return array
     */
    public function execute(Model $model, array $details): array
    {
        foreach ($details['user_ids'] as $id) {
            $user = User::find($id);
        }

        return $details;
    }

    /**
     * Based on the current `user_id` key, find the next user in the round-robin
     * assignment flow, and set that as the next `user_id` to use when assigning.
     *
     * @param WorkflowAction $action
     * @param array          $details
     *
     * @return bool
     */
    public function updateActionDetails(WorkflowAction $action, array $details): bool
    {
        $action->details = $details;

        return $action->save();
    }


}