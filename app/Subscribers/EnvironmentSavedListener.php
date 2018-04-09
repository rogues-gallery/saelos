<?php

namespace App\Subscribers;

use File;
use Hash;
use RachidLaasri\LaravelInstaller\Events\EnvironmentSaved;

/**
 * Class EnvironmentSavedListener
 *
 * @package App\Subscribers
 */
class EnvironmentSavedListener
{
    public function handle(EnvironmentSaved $event)
    {
        $request = $event->getRequest();

        // Persist user info from install form for later
        if ($request->has('user_username')) {
            File::put(storage_path('install.json'), json_encode([
                'name' => $request->get('user_name'),
                'username' => $request->get('user_username'),
                'email' => $request->get('user_email'),
                'password' => Hash::make($request->get('user_password')),
            ]));
        }
    }
}
