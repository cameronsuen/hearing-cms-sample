<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIpaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ipa', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('set_id')->unsigned()->nullable(false);
			$table->foreign('set_id')->references('set_id')->on('set');
			$table->char('vowel', 1)->nullable();
			$table->char('consonant', 1)->nullable(false);
			$table->integer('windex')->unsigned()->nullable();
			$table->char('word', 1)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('ipa');
    }
}
