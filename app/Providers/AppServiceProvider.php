<?php

namespace App\Providers;

use App\Company;
use App\CustomFieldValue;
use App\Deal;
use App\Observers\ApplyWorkflowObserver;
use App\Observers\CustomFieldWorkflowObserver;
use App\Observers\ModelUpdateObserver;
use App\Person;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Person::observe(ApplyWorkflowObserver::class);
        Person::observe(ModelUpdateObserver::class);

        Deal::observe(ApplyWorkflowObserver::class);
        Deal::observe(ModelUpdateObserver::class);

        Company::observe(ApplyWorkflowObserver::class);
        Company::observe(ModelUpdateObserver::class);

        CustomFieldValue::observe(CustomFieldWorkflowObserver::class);
        CustomFieldValue::observe(ModelUpdateObserver::class);

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
