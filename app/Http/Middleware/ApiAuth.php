<?php

namespace App\Http\Middleware;

use Closure;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

use Illuminate\Http\Response;
//use Exception;

class ApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
		$role = checkToken($request->header('Authorization'));

		if ($role > 0) {
			$request->merge(['role' => $role]);
			return $next($request);
		} else {
			return response()->json(['success' => false, 'error' => $request->header('Authorization')]);
		}

    }
}
