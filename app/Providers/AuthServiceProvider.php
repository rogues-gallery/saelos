<?php

namespace App\Providers;

use App;
use App\Role;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        if (file_exists(storage_path('installed'))) {
            // Assign all role names as available token scopes
            Passport::tokensCan([
                'admin' => 'Admin User',
                'manager' => 'Manager User',
                'user' => 'User'
            ]);
        }
    }
}
