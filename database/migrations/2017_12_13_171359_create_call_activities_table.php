<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCallActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('call_activities', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->uuid('uuid');
            $table->json('details');
            $table->text('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('call_activities');
    }
}
