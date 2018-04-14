<?php

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Api\Auth\LoginController@login')->name('auth.login');

Route::group(['middleware' => 'auth:api'], function() {
    Route::delete('logout', 'Api\Auth\LoginController@logout')->name('auth.logout');

    Route::get('/user', function(Request $request) {
        $user = $request->user();
        $user->load(['team', 'team.users', 'settings', 'customFields']);

       return new UserResource($user);
    })->name('active_user');
});