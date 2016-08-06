<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class BackgroundTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
		DB::table('background')->insert([
			'sample' => 'sample'
		]);
		
		DB::table('background')->insert([
			'sample' => 'sample'
		]);

    }
}
