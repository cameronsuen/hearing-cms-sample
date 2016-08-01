<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Exception;

use App\Http\Requests;
use App;
use DB;
use App\Sample;
use App\IPA;
use App\Background;
use App\Http\Controllers\Controller;

class SampleController extends Controller
{
    //
	public function index()
	{
		$sql = 'SELECT j.* 
				FROM ( 
					 SELECT @cnt := COUNT(*) + 1, @lim := 5 
					 FROM sample 
					 ) vars 
				STRAIGHT_JOIN 
				     ( 
					 SELECT s.id, s.sample, i.word, i.img, @lim := @lim - 1 
					 FROM sample s 
					 INNER JOIN ipa i
					 ON s.word_id = i.id 
					 WHERE (@cnt := @cnt - 1) AND RAND() < @lim / @cnt
					 ) j';
		$wordList = DB::select($sql); 
		return response()->json($wordList);
	}

	public function update(Request $request, $sampleId)
	{
		try {
			$op = $request->input('op');
			$field = $request->input('field');
			$value = $request->input('value');
			$sample = Sample::find($sampleId);
			
			if ($op != 'add') {
				throw new Exception('Unsupported operation');
			} else if (!in_array($field, array('correct', 'incorrect', 'unsure', 'noise'))) {
				throw new Exception('Unsupported field');
			} else if (!is_int($value)) {
				throw new Exception('Unsupported value');
			} else {
				$sample->$field += $value;
				$sample->save();
				return response()->json(['success' => true]);
			}

		} catch(Exception $e) {
			return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
		}
	}
}
