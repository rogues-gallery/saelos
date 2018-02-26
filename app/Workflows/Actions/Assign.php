<?php

namespace App\Workflows\Actions;

use App\User;
use App\WorkflowAction;
use Illuminate\Database\Eloquent\Model;

class Assign implements ActionInterface
{
    private $didApply = true;

    /**
     * @param Model $model
     * @param array $details
     *
     * @return array
     */
    public function execute(Model $model, array $details): array
    {
        if ($model->user instanceof User) {
            $this->didApply = false;
            return $details;
        }

        $user = User::find($details['user_id']);

        $model->user()->associate($user);

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
        // Bail early if we didn't apply the rule
        if ($this->didApply === false) {
            return true;
        }

        $assignedTo = $details['user_id'];
        $availableUsers = $details['users'];
        $useNext = false;

        // Loop available users to see who the last user assigned was
        foreach ($availableUsers as $index => $id) {
            if ($useNext) {
                $details['user_id'] = $id;
                break;
            }

            $nextId = $index + 1;

            if ($assignedTo === $id && isset($availableUsers[$nextId])) {
                $useNext = true;
            }
        }

        // If $useNext wasn't set, restart the rotation
        if ($useNext === false) {
            $details['user_id'] = $availableUsers[0];
        }

        $action->details = $details;

        return $action->save();
    }


}