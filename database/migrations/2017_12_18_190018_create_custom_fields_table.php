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
        Schema::create('fields', function (Blueprint $table) {
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->timestamps();
            $table->softDeletes();
            $table->string('label');
            $table->string('alias');
            $table->string('model');
            $table->string('group')->default('core');
            $table->enum('type', ['text', 'textarea', 'radio', 'checkbox', 'select', 'lookup', 'picklist', 'number', 'date', 'email', 'url', 'entity']);
            $table->string('entity_class')->nullable();
            $table->string('default')->nullable();
            $table->longText('values')->nullable();
            $table->boolean('required')->default(0);
            $table->boolean('protected')->default(0);
            $table->boolean('hidden')->default(0);
            $table->boolean('searchable')->default(0);
            $table->boolean('summary')->default(false);
            $table->integer('ordering')->default(0);
        });

        Schema::create('custom_field_values', function (Blueprint $table) {
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->timestamps();
            $table->morphs('model');
            $table->integer('custom_field_id')->unsigned()->index();
            $table->foreign('custom_field_id')->references('id')->on('fields')->onDelete('cascade');
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
        Schema::dropIfExists('fields');
    }
}
