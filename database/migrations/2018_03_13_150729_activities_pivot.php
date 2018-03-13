<?php

use App\Activity;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ActivitiesPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_entities', function(Blueprint $table) {
            $table->increments('id');
            $table->morphs('entity');
            $table->integer('activity_id')->unsigned()->index();
            $table->foreign('activity_id')->references('id')->on('activities')->onDelete('cascade');
            $table->boolean('primary')->default(false);
        });

        Activity::chunk(50, function($activities) {
            foreach ($activities as $activity) {
                \DB::table('activity_entities')->insert([
                    'entity_id' => $activity->entity_id,
                    'entity_type' => $activity->entity_type,
                    'activity_id' => $activity->id,
                    'primary' => true
                ]);
            }
        });

        Schema::table('activities', function(Blueprint $table) {
            $table->dropColumn('entity_id');
            $table->dropColumn('entity_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
