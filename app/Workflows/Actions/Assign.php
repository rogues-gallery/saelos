<?php

namespace App\Workflows\Actions;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Assign implements ActionInterface
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

        $model->user()->associate($user);

        return true;
    }
}