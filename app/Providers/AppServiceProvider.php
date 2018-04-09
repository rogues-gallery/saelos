<?php

namespace App\Providers;

use App\Company;
use App\CustomFieldValue;
use App\Opportunity;
use App\Observers\ApplyWorkflowObserver;
use App\Observers\CustomFieldWorkflowObserver;
use App\Observers\ModelUpdateObserver;
use App\Contact;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Console;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Contact::observe(ApplyWorkflowObserver::class);
        Contact::observe(ModelUpdateObserver::class);

        Opportunity::observe(ApplyWorkflowObserver::class);
        Opportunity::observe(ModelUpdateObserver::class);

        Company::observe(ApplyWorkflowObserver::class);
        Company::observe(ModelUpdateObserver::class);

        CustomFieldValue::observe(CustomFieldWorkflowObserver::class);
        CustomFieldValue::observe(ModelUpdateObserver::class);

        // Register passport commands so they can be ran via web
        if (!$this->app->runningInConsole()) {
            $this->registerPassportForWeb();
        }
    }

    private function registerPassportForWeb()
    {
        $this->loadMigrationsFrom(base_path('vendor/laravel/passport/database/migrations'));

        $this->commands([
            Console\InstallCommand::class,
            Console\ClientCommand::class,
            Console\KeysCommand::class,
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
