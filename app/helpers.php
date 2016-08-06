<?php

use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;

//use Exception;

/**
 * Helper function to check validity of token
 *
 * @param  string	 $auth_str
 * @param  \Closure  $next
 * @return bool
 */
	
function checkToken($auth_str)
{
	try {
		$auth_header = explode(' ', $auth_str);
		
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

		return $token->getClaim('role');
	} catch(Exception $e) {
		return -1;
	}
}
