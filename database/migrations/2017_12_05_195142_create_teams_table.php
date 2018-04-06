<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->softDeletes();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('leader_id')->unsigned()->index()->nullable();
            $table->foreign('leader_id')->references('id')->on('users');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->integer('team_id')->unsigned()->index()->nullable();
            $table->foreign('team_id')->references('id')->on('teams');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teams');
    }
}
