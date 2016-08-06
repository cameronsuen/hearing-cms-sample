<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class FileController extends Controller
{
	public function getFile($type, $filename)
	{
		return response()->download(storage_path($type.'/'.$filename), null, [], null);
	}
}
