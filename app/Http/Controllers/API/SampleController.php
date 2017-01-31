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

use Chumper\Zipper\Zipper;

class SampleController extends Controller
{
    //
	public function index(Request $request)
	{
		$export = false;
		$minView = 0;
		$minCorrectStat = 0;

		// Normal users (testers) can receive 
		$limit = 5;

		// Normal testers should not be able to export samples/filter by statistics
		if ($request->input('role') >= 200)
		{
			// Whether to package all the wav files as a zip
			$bundle = $request->input('export', false);

			// Minimum no. of validations on the sample
			$minView = $request->input('minView', 0);
		
			// Minimum percentage of 'correct' validations given to a sample
			$minCorrectStat = $request->input('minCorrectStat', 0);
			
			// No. of samples to get
			// Limit of -1 means getting all record
			$limit = $request->input('limit', -1);
		} else {
			if ($request->has('limit') || $request->has('export') || $request->has('minView') || $request->has('minCorrectStat')) {
				return response()->json(['success' => false, 'error' => 'Unauthorized access']);
			}
		}


				
		// Whether the samples returned should be untested by current authenticated user
		$untested = $request->input('untested', true);
		

		$query = DB::table('sample')
					->join('ipa', 'ipa.id', '=', 'sample.word_id');

		if ($minView > 0) {
			$query = $query->whereRaw('correct + incorrect + unsure + noise >= ?', [$minView]);
		}

		if ($minCorrectStat > 0) {
			$query = $query->whereRaw('(SELECT COALESCE(correct / NULLIF(correct + incorrect + unsure + noise, 0), 0) FROM sample)  >= ?', [$minCorrectStat]);
		}

		if ($request->input('role') >= 200) {
			$query = $query->addSelect('sample.*', 'ipa.word', 'ipa.img');
		} else {
			$query = $query->addSelect('sample.id', 'sample.sample', 'ipa.word', 'ipa.img');
		}


		if ($limit > 0) {
			$query = $query->take($limit)
			               ->orderBy(DB::raw('RAND()'));
		}

		$samples = $query->get();
		
		if ($export) {
			$zipper = new Zipper;
			$zipper->make('public/bundle.zip');
			foreach($samples as $entry) 
			{
				$zipper->addFile('storage/audio/'.$entry);
				$samples = 'bundle.zip';
			}
		}


		return response()->json(['success' => true, 'data' => $samples]);
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

	public function upload(Request $request)
	{
		$files = $request->allFiles();
		foreach($files as $sample)
		{
			// Check if sample is valid 
			if (!$sample->isValid()) {
				throw new Exception('Invalid file');
			}

			$name = $sample->getClientOriginalName();
			$fileAttr = explode('_', $name);

			if (count($fileAttr) != 8) {
				throw new Exception('Invalid filename');
			}

			if ($fileAttr	
		}
	}
}
