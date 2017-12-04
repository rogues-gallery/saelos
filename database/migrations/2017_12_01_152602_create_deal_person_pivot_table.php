<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDealPersonPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deal_person', function (Blueprint $table) {
            $table->integer('deal_id')->unsigned()->index();
            $table->foreign('deal_id')->references('id')->on('deals')->onDelete('cascade');
            $table->integer('person_id')->unsigned()->index();
            $table->foreign('person_id')->references('id')->on('people')->onDelete('cascade');
            $table->boolean('primary')->default(0);
            $table->primary(['deal_id', 'person_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('deal_person');
    }
}
