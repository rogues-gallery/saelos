<?php

namespace App\Providers;

use App\Subscribers\ContactSubscriber;
use App\Subscribers\InstallListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use RachidLaasri\LaravelInstaller\Events\LaravelInstallerFinished;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        LaravelInstallerFinished::class => [
            InstallListener::class
        ]
    ];

    protected $subscribe = [
        ContactSubscriber::class,
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
