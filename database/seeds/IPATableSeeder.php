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
			'word' => '救',
			'img' => 'g_au3.png'
		]);

        DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'b',
			'consonant' => 'at',
			'tone' => 1,
			'word' => '筆',
			'img' => 'b_at1.png'
		]);
 		
		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'p',
			'consonant' => 'iu',
			'tone' => 1,
			'word' => '飄',
			'img' => 'p_iu1.png'
		]);

		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'm',
			'consonant' => 'ei',
			'tone' => 4,
			'word' => '眉',
			'img' => 'm_ei1.png'
		]);
		
		DB::table('ipa')->insert([
			'set_id' => 1,
			'vowel' => 'd',
			'consonant' => 'eoi',
			'tone' => 6,
			'word' => '隊',
			'img' => 'd_eoi6.png'
		]);

		DB::table('ipa')->insert([
			'set_id' => 2,
			'vowel' => 'd',
			'consonant' => 'au',
			'tone' => 6,
			'word' => '豆',
			'img' => 'd_au6.png'
		]);

		DB::table('ipa')->insert([
			'set_id' => 2,
			'vowel' => 'b',
			'consonant' => 'ei',
			'tone' => 2,
			'word' => '髀',
			'img' => 'b_ei2.png'
		]);

        DB::table('ipa')->insert([
			'set_id' => 2,
			'vowel' => 't',
			'consonant' => 'ong',
			'tone' => 4,
			'word' => '糖',
			'img' => 't_ong4.png'
		]);
 		
		DB::table('ipa')->insert([
			'set_id' => 2,
			'vowel' => 's',
			'consonant' => 'am',
			'tone' => 1,
			'word' => '心',
			'img' => 's_am1.png'
		]);

		DB::table('ipa')->insert([
			'set_id' => 2,
			'vowel' => '',
			'consonant' => 'au',
			'tone' => 1,
			'word' => '嘔',
			'img' => 'au1.png'
		]);
		
		
	}
}
