<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImports extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imports', function (Blueprint $table) {
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->increments('id');
            $table->timestamps();
            $table->boolean('processed')->default(0);
            $table->string('name');
            $table->string('filename');
            $table->integer('rows')->nullable();
            $table->string('entity_type');
            $table->text('field_mapping')->nullable();
            $table->string('errors')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imports');
    }
}
