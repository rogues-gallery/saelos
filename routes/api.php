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

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/people/{id}/email', 'PersonController@email');

        Route::get('/tasks', function () {
            $people = \App\Person::where('user_id', Auth::user()->id)
                ->with(\App\Http\Controllers\PersonController::INDEX_WITH)
                ->orderBy('updated_at')
                ->get();

            return \Illuminate\Http\JsonResponse::create($people);
        });

        Route::resource('deals.documents', 'DealDocumentController');
        Route::resource('people.documents', 'PersonDocumentController');
        Route::resource('companies.documents', 'CompanyDocumentController');

        Route::get('/reports/{id}/export', 'ReportExportController@export');

        Route::get('/contexts/{model}', 'ContextController@show')
            ->where('model', '[a-zA-Z/]+');

        Route::resource('people.notes', 'PersonCommentController');
        Route::resource('companies.notes', 'CompanyCommentController');
        Route::resource('deals.notes', 'DealCommentController');

        Route::resource('people', 'PersonController');
        Route::resource('deals', 'DealController');
        Route::resource('companies', 'CompanyController');
        Route::resource('stages', 'StageController');
        Route::resource('teams', 'TeamController');
        Route::resource('activities', 'ActivityController');
        Route::resource('users', 'UserController');
        Route::resource('reports', 'ReportController');
        Route::resource('workflows', 'WorkflowController');
    });
});