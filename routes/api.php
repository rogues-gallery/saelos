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
    'as' => 'api.',
    'middleware' => 'auth:api',
], function () {
    Route::get('/me', function () {
        return \Illuminate\Http\JsonResponse::create(Auth::user());
    });

    Route::resource('people', 'PersonController');
    Route::resource('deals', 'DealController');
    Route::resource('companies', 'CompanyController');
    Route::resource('stages', 'StageController');
    Route::resource('teams', 'TeamController');
    Route::resource('activities', 'ActivityController');
});