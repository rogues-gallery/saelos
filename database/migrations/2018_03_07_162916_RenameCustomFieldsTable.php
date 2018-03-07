<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameCustomFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('custom_fields', 'fields');

        Schema::table('fields', function (Blueprint $table) {
            $table->tinyInteger('protected')->default(0);
            $table->tinyInteger('hidden')->default(0);
            $table->tinyInteger('ordering')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fields', function (Blueprint $table) {
            $table->dropColumn('protected');
            $table->dropColumn('hidden');
            $table->dropColumn('ordering');
        });

        Schema::rename('fields', 'custom_fields');
    }
}
