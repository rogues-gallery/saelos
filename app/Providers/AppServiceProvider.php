<?php

namespace App\Providers;

use App\Contact;
use App\Company;
use App\CustomFieldValue;
use App\Observers\ModelUpdateObserver;
use App\Observers\UserObserver;
use App\Opportunity;
use App\Settings;
use App\User;
use Carbon\Carbon;
use Config;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Console;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Carbon::setWeekStartsAt(Carbon::SUNDAY);
        Carbon::setWeekEndsAt(Carbon::SATURDAY);

        Contact::observe(ModelUpdateObserver::class);

        Opportunity::observe(ModelUpdateObserver::class);

        Company::observe(ModelUpdateObserver::class);

        CustomFieldValue::observe(ModelUpdateObserver::class);

        User::observe(UserObserver::class);

        // Register passport commands so they can be ran via web
        if (!$this->app->runningInConsole()) {
            $this->registerPassportForWeb();
        }

        Validator::extend('model_exists', function ($attribute, $value, $parameters, $validator) {
            $modelId = (int) $value;
            $modelType = array_get($validator->getData(), $parameters[0]);

            if (! is_subclass_of($modelType, Model::class)) {
                return false;
            }

            return (bool) $modelType::find($modelId);
        });

        $this->loadTranslationsFrom(resource_path().'/lang', 'saelos');

        if (file_exists(storage_path().'/installed') && count(Schema::getColumnListing('settings'))) {
            $settings = Settings::where('user_id', '')->orWhereNull('user_id')->get();

            foreach ($settings as $setting) {
                Config::set('settings.'.$setting->name, $setting->value);
            }
        } else {
            Config::set('settings', []);
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
