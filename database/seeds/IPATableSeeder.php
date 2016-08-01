<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IPATableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'g',
			'consonant' => 'au',
			'tone' => 3,
			'word' => '救'
		]);

        DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'b',
			'consonant' => 'at',
			'tone' => 1,
			'word' => '筆'
		]);
 		
		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'p',
			'consonant' => 'iu',
			'tone' => 1,
			'word' => '飄'
		]);

		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'm',
			'consonant' => 'ei',
			'tone' => 4,
			'word' => '眉'
		]);
		
		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'd',
			'consonant' => 'eoi',
			'tone' => 6,
			'word' => '隊'
		]);
	}
}
