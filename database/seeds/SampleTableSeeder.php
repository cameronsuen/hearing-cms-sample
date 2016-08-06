<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class SampleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		for ($i = 1; $i <= 10; ++$i) {
			
			$gender = array('M', 'F');
			DB::table('sample')->insert([
				'id' => $i,
				'word_id' => $i + 1,
				'background_id' => $i % 2 + 1,
				'recorder' => 'test',
				'stamp' => time(),
				'gender' => $gender[$i % 2],
				'age' => $i * 5,
				'hearing_prob' => ($i - 1) % 2,
				'phone' => 'G3_Stylus',
				'correct' => 0,
				'incorrect' => 0,
				'unsure' => 0,
				'noise' => 0,
				'sample' => 'test'.$i.'.wav'
			]);

		}
    }
}
