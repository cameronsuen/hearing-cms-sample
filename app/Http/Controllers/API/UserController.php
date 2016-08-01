<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use Gate;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;

class UserController extends Controller
{
    //
	public function index()
	{
		$role = JWTAuth::getPayload()->get('role');
		if (Gate::denies('isAdmin', $role)) {
			abort(403);
		}
		return App::
	}
}
