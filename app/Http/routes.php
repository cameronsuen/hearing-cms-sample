<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('authenticate', 'Auth\AuthenticateController@authenticate');

Route::group(['prefix' => 'api', 'middleware' => 'token.check'], function() {
//Route::group(['prefix' => 'api'], function() {
	Route::resource('users', 'API\UserController', ['only' => 'index']);
	Route::resource('samples', 'API\SampleController', ['only' => ['index', 'update']]);
});

Route::get('validate', 'ValidateController@index');
Route::get('login', 'LoginController@index');
