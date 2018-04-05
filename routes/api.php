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

    Route::post('users/{id}/inboundcall', 'UserController@inboundcall')
        ->name('users.inbound');
    Route::post('users/{id}/inbound/recording', 'UserController@recording')
        ->name('users.inbound.recording');
    Route::post('users/{id}/inboundsms', 'UserController@inboundsms')
        ->name('users.sms.inbound');

    Route::post('/contacts/{id}/outbound/recording', 'ContactController@recording')
        ->name('contacts.outbound.recording');

    Route::post('/contacts/{id}/outbound/{user_id}', 'ContactController@outbound')
        ->name('contacts.outbound');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/contacts/{id}/call', 'ContactController@call');
        Route::post('/contacts/{id}/sms', 'ContactController@sms');
        Route::post('/contacts/{id}/email', 'ContactController@email');

        Route::get('/tasks', function () {
            $people = \App\Contact::where('user_id', Auth::user()->id)
                ->with(\App\Http\Controllers\ContactController::INDEX_WITH)
                ->orderBy('updated_at')
                ->get();

            return \Illuminate\Http\JsonResponse::create($people);
        });

        Route::get('/reports/{id}/export', 'ReportExportController@export');

        Route::get('/contexts/{model}', 'ContextController@show')
            ->where('model', '[a-zA-Z/]+');

        Route::resource('contacts.notes', 'ContactNoteController');
        Route::resource('companies.notes', 'CompanyNoteController');
        Route::resource('opportunities.notes', 'OpportunityNoteController');

        Route::resource('contacts', 'ContactController');
        Route::resource('opportunities', 'OpportunityController');
        Route::resource('companies', 'CompanyController');

        Route::resource('stages', 'StageController')
            ->middleware('scope:admin,manager');

        Route::resource('tags', 'TagController')
            ->middleware('scope:admin,manager');

        Route::resource('statuses', 'StatusController')
            ->middleware('scope:admin,manager');

        Route::resource('teams', 'TeamController')
            ->middleware('scope:admin,manager');

        Route::resource('activities', 'ActivityController');

        Route::resource('users', 'UserController')
            ->middleware('scope:admin,manager');

        Route::resource('reports', 'ReportController')
            ->middleware('scope:admin,manager');

        Route::resource('fields', 'FieldController')
            ->middleware('scope:admin,manager');

        Route::resource('workflows', 'WorkflowController')
            ->middleware('scope:admin,manager');

        Route::resource('roles', 'RoleController')
            ->middleware('scope:admin,manager');
    });
});