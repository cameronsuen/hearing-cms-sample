<?php

namespace App\Http\Middleware;

use Closure;

class FrontendAuth
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
        	return $next($request);
		} else {
			return redirect('login');
		}

    }
}
