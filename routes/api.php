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
], function () {
    # People
    Route::get('/people', function() {
        return new App\Http\Resources\PersonCollection(App\Person::with(['user', 'company', 'deals'])->paginate());
    });
    Route::get('/people/{id}', 'PersonController@show');
    Route::delete('/people/{id}', 'PersonController@destroy');

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
});