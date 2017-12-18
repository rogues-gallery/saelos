<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('label');
            $table->string('alias');
            $table->string('model');
            $table->string('group')->default('core');
            $table->enum('type', ['text', 'textarea', 'radio', 'checkbox', 'select', 'lookup']);
            $table->string('default');
            $table->json('values');
            $table->boolean('required')->default(0);
        });

        Schema::create('custom_field_values', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->morphs('model');
            $table->integer('custom_field_id')->unsigned()->index();
            $table->foreign('custom_field_id')->references('id')->on('custom_fields');
            $table->text('value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_field_values');
        Schema::dropIfExists('custom_fields');
    }
}
