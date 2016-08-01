<?php

namespace App\Http\Middleware;

use Closure;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

use Illuminate\Http\Response;
use Exception;

class CheckToken
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
		try {
			$auth_header = explode(' ', $request->header('Authorization'));
			
			if ($auth_header[0] != 'Bearer') {
				throw new Exception();
			}

			$signer = new Sha256();
			$token = (new Parser())->parse($auth_header[1]);

			if (! $token->verify($signer, env('HMAC_SIGNER', ''))) {
				throw new Exception();
			}

			$data = new ValidationData();
			$data->setIssuer('hearing_cms@gce');
			$data->setAudience('hearing_cms@gce');
        
			if (!$token->validate($data)) {
				throw new Exception();
			}

			return $next($request);
		} catch(Exception $e) {
			return response()->json(['success' => false, 'error' => $auth_header]);
		}
    }
}
