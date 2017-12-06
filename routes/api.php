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
    # People
    Route::resource('people', 'PersonController');

    # Deals
    Route::get('/deals', function() {
        return new App\Http\Resources\DealCollection(App\Deal::with(['user', 'company', 'people'])->paginate());
    });
    Route::get('/deals/{id}', 'DealController@show');

    # Companies
    Route::get('/companies', function() {
        return new App\Http\Resources\CompanyCollection(App\Company::with(['user', 'people', 'deals'])->paginate());
    });
    Route::get('/companies/{id}', 'CompanyController@show');

    # Stages
    Route::get('/stages', function() {
        return new App\Http\Resources\StageCollection(App\Stage::with(['deals', 'userDeals', 'teamDeals'])->paginate());
    });
    Route::get('/stages/{id}', 'StageController@show');

});