<?php

namespace App\Http\Middleware;

use Closure;

class LoginRedirect
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
		if (checkToken($request->header('Authorization'))) {
			return redirect('validate');
		} else {
        	return $next($request);
		}
    }
}
