<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTone extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
		Schema::table('ipa', function ($table) {
			$table->integer('tone')->after('consonant')->unsigned()->nullable(false);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('ipa', function ($table) {
			$table->dropColumn('tone');
		});
    }
}
