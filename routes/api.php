<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => '/v1',
    'as' => 'api.'
], function () {
    Route::prefix('auth')->group(base_path('routes/api/auth.php'));

    Route::post('users/{user}/inboundcall', 'UserController@inboundcall')
        ->name('users.inbound');
    Route::post('users/{user}/inbound/recording', 'UserController@recording')
        ->name('users.inbound.recording');
    Route::post('users/{user}/inboundsms', 'UserController@inboundsms')
        ->name('users.sms.inbound');

    Route::post('/contacts/{contact}/outbound/recording', 'ContactController@recording')
        ->name('contacts.outbound.recording');

    Route::post('/contacts/{contact}/outbound/{user}', 'ContactController@outbound')
        ->name('contacts.outbound');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('stages/pipeline', 'StageController@pipeline')
            ->name('stage_pipeline');
        Route::get('activities/graph', 'ActivityController@graph')
            ->name('activities.graph');
        Route::post('/users/{user}/purchaseNumber', 'UserController@purchaseNumber')
            ->name('users.purchaseNumber');
        Route::get('/users/{user}/count', 'UserController@count')
            ->name('users.count');
        Route::get('/contacts/count','ContactController@count')
            ->name('contacts.count');
        Route::post('/contacts/{contact}/call', 'ContactController@call')
            ->name('contacts.call');
        Route::post('/contacts/{contact}/sms', 'ContactController@sms')
            ->name('contact.sms');
        Route::post('/contacts/{contact}/email', 'ContactController@email')
            ->name('contacts.email');
        Route::get('/reports/{report}/export', 'ReportExportController@export')
            ->name('reports.export');

        Route::post('/settings', 'SettingsController@store')
            ->name('settings.store');

        /**
         * @deprecated Use the /fields endpoint instead
         */
        Route::get('/contexts/{model}', 'ContextController@show')
            ->where('model', '[a-zA-Z/]+');

        Route::apiResource('contacts.notes', 'ContactNoteController');
        Route::apiResource('companies.notes', 'CompanyNoteController');
        Route::apiResource('opportunities.notes', 'OpportunityNoteController');

        Route::apiResource('contacts', 'ContactController');
        Route::apiResource('opportunities', 'OpportunityController');
        Route::apiResource('companies', 'CompanyController');
        Route::apiResource('stages', 'StageController');
        Route::apiResource('tags', 'TagController');
        Route::apiResource('statuses', 'StatusController');
        Route::apiResource('activities', 'ActivityController');
        Route::apiResource('fields', 'FieldController');
        Route::apiResource('users', 'UserController');

        Route::group(['middleware' => 'scope:admin,manager'], function () {
            Route::apiResource('teams', 'TeamController');
            Route::apiResource('reports', 'ReportController');
            Route::apiResource('roles', 'RoleController');
        });
    });
});
