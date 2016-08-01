<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSampleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sample', function (Blueprint $table) {
            $table->increments('id');
			$table->integer('word_id')->unsigned()->nullable(false);
			$table->foreign('word_id')->references('id')->on('ipa');
			$table->integer('background_id')->unsigned()->nullable(false);
			$table->foreign('background_id')->references('id')->on('background');
			$table->string('recorder', 45)->nullable(false);
			$table->foreign('recorder')->references('username')->on('users');
			$table->timestamp('stamp')->nullable(false);
			$table->char('gender', 1)->nullable(false);
			$table->integer('age')->unsigned()->nullable(false);
			$table->boolean('hearing_prob')->nullable(false);
			$table->string('phone', 20)->nullable(false);
			$table->text('sample')->nullable(false);
			
			$table->integer('correct')->unsigned()->nullable(false);
			$table->integer('incorrect')->unsigned()->nullable(false);
			$table->integer('unsure')->unsigned()->nullable(false);
			$table->integer('noise')->unsigned()->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('sample');
    }
}
