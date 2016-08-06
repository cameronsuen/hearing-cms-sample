<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class SysFunctionController extends Controller
{
    public function index()
	{
		$functions = ['Home' => 'home', 
					  'Validate' => 'validate',
					  'Import' => 'import',
					  'Export' => 'export',
					  'Statistics' => 'stat',
					  'Admin' => 'admin'
					 ];
		return response()->json(['success' => true, 'data' => $functions]);
	}
}
