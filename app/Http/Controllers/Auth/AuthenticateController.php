<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Exception;

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class AuthenticateController extends Controller
{
	public function authenticate(Request $request)
	{
		try {
			$credentials = $request->only('username', 'password');
			
			if (!Auth::once($credentials)) {
				throw new Exception();
			}
			
			$signer = new Sha256();
			$token = (new Builder())->setIssuer('hearing_cms@gce')
								    ->setAudience('hearing_cms@gce')
									->setIssuedAt(time())
									->setNotBefore(time())
									->setExpiration(time() + 3600)
									->set('username', $credentials['username'])
									->set('role', Auth::user()->role)
									->sign($signer, env('HMAC_SIGNER', ''))
									->getToken();

			return response()->json(['success' => true, 'access_token' => (String) $token]);

		} catch(Exception $e) {
			return response()->json(['success' => false, 'error' => 'Invalid credentials']);
		}
	}
}
