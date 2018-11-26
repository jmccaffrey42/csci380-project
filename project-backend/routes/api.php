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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return \App\User::create([
        'name' => 'jmc',
        'email' => 'jmc@teammccaffrey.com',
    ]);
});

Route::get('lists', 'ListController@index');
Route::post('lists', 'ListController@store');
Route::put('lists/{id}', 'ListController@update');
Route::delete('lists/{id}', 'ListController@delete');

Route::get('cards/{id}', 'CardController@show');
Route::post('cards', 'CardController@store');
Route::put('cards/{id}', 'CardController@update');
Route::delete('cards/{id}', 'CardController@delete');

Route::post('comments', 'CommentController@store');
Route::put('comments/{id}', 'CommentController@update');
Route::delete('comments/{id}', 'CommentController@delete');

Route::get('users', 'UsersController@index');
Route::get('users/{id}', 'UsersController@show');
Route::post('users', 'UsersController@store');
Route::put('users/{id}', 'UsersController@update');
