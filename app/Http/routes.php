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

Route::group(['prefix' => 'api', 'middleware' => 'api.auth'], function() {
	Route::resource('users', 'API\UserController', ['only' => 'index']);
	Route::resource('samples', 'API\SampleController', ['only' => ['index', 'update']]);
});

Route::group(['middleware' => 'api.auth'], function() {
	Route::get('sysFunction', 'SysFunctionController@index');
});

Route::get('{path}', 'ValidateController@index');

Route::get('file/{type}/{filename}', 'FileController@getFile')->where('filename', '^[^/]+$');
