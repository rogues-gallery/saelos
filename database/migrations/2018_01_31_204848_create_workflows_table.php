<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkflowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workflows', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->boolean('published')->default(true);
            $table->string('name');
            $table->string('entity_type');
            $table->integer('process_at');
            $table->string('field_alias');
            $table->string('operator')->default('eq');
            $table->string('check_value');
        });

        Schema::create('workflow_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('type');
            $table->text('details');
            $table->integer('workflow_id')->unsigned()->index()->nullable();
            $table->foreign('workflow_id')->references('id')->on('workflows');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workflow_actions');
        Schema::dropIfExists('workflows');
    }
}
