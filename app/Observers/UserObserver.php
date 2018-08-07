<?php

namespace App\Observers;

use App\User;

class UserObserver
{
    public function created(User $user)
    {
        $user->setSettings([
            'views' => '[{"linkText":"Assigned to Me","parentItem":"contacts","color":"#b21e22","searchString":"assignee:me"},{"linkText":"Assigned to Me","color":"#b21e22","parentItem":"companies","searchString":"assignee:me"},{"linkText":"Assigned to Me","color":"#b21e22","parentItem":"opportunities","searchString":"assignee:me"}]'
        ]);
    }
}