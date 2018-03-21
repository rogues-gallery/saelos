<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Structure extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Now that the tables are renamed, add back fk's and idx's
        Schema::table('opportunity_contact', function (Blueprint $table) {
            $table->renameColumn('deal_id', 'opportunity_id');
            $table->renameColumn('person_id', 'contact_id');
            $table->index('opportunity_id');
            $table->index('contact_id');
            $table->foreign('opportunity_id')->references('id')->on('opportunities');
            $table->foreign('contact_id')->references('id')->on('contacts');
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('opportunities', function (Blueprint $table) {
            $table->index('stage_id');
            $table->foreign('stage_id')->references('id')->on('stages');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('company_xref', function (Blueprint $table) {
            $table->index(['entity_id', 'entity_type']);
            $table->index('company_id');
            $table->foreign('company_id')->references('id')->on('companies');
        });

        \DB::table('custom_field_values')
            ->where('model_type', 'App\\Deal')
            ->update(['model_type' => 'App\\Opportunity']);

        \DB::table('custom_field_values')
            ->where('model_type', 'App\\Person')
            ->update(['model_type' => 'App\\Contact']);

        \DB::table('fields')
            ->where('model', 'App\\Deal')
            ->update(['model' => 'App\\Opportunity']);

        \DB::table('fields')
            ->where('model', 'App\\Person')
            ->update(['model' => 'App\\Contact']);

        \DB::table('company_entities')
            ->where('entity_type', 'App\\Deal')
            ->update(['entity_type' => 'App\\Opportunity']);

        \DB::table('company_entities')
            ->where('entity_type', 'App\\Person')
            ->update(['entity_type' => 'App\\Contact']);

        \DB::table('documents')
            ->where('entity_type', 'App\\Deal')
            ->update(['entity_type' => 'App\\Opportunity']);

        \DB::table('documents')
            ->where('entity_type', 'App\\Person')
            ->update(['entity_type' => 'App\\Contact']);

        \DB::table('notes')
            ->where('entity_type', 'App\\Deal')
            ->update(['entity_type' => 'App\\Opportunity']);

        \DB::table('notes')
            ->where('entity_type', 'App\\Person')
            ->update(['entity_type' => 'App\\Contact']);

        \DB::table('workflows')
            ->where('entity_type', 'App\\Deal')
            ->update(['entity_type' => 'App\\Opportunity']);

        \DB::table('workflows')
            ->where('entity_type', 'App\\Person')
            ->update(['entity_type' => 'App\\Contact']);

        \DB::table('activity_entities')
            ->where('entity_type', 'App\\Deal')
            ->update(['entity_type' => 'App\\Opportunity']);

        \DB::table('activity_entities')
            ->where('entity_type', 'App\\Person')
            ->update(['entity_type' => 'App\\Contact']);
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
