<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/logout', function () {
    Auth::logout();

    return redirect('/login');
});

Route::get('/me', function () {
    return \Illuminate\Http\JsonResponse::create(Auth::user());
});

Route::get('/authenticated', function () {
    $user = \Auth::user();

    if ($user instanceof \App\User) {
        return response(['status' => $user->load(['team', 'team.users', 'team.users.deals', 'team.users.customFields'])->toArray()]);
    }

    return response(['status' => 'Not Authenticated']);
});

Auth::routes();
Broadcast::routes();

Route::get('/home', function () {
    return \Illuminate\Support\Facades\Redirect::to('/');
});

Route::get('/', 'ReactController@index')->name('react-home');
Route::get('/{slug}', 'ReactController@index')->name('react');
Route::get('/{slug}/{sub}', 'ReactController@index')->name('react-sub');
