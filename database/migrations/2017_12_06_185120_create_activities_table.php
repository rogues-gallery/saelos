<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->morphs('entity');
            $table->string('title');
            $table->text('description');
            $table->boolean('completed')->default(0);
            $table->dateTime('due_date')->nullable();
            $table->dateTime('fulfillment_date')->nullable();
            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('activity_details', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('activity_id')->unsigned()->index()->nullable();
            $table->foreign('activity_id')->references('id')->on('activities');
            $table->text('type');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->text('call_uuid')->nullable();
            $table->longText('details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_details');
        Schema::dropIfExists('activities');
    }
}
