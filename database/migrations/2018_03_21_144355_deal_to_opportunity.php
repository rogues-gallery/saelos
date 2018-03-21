<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DealToOpportunity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('deal_person', function (Blueprint $table) {
            $table->dropForeign('deal_person_deal_id_foreign');
            $table->dropForeign('deal_person_person_id_foreign');
            $table->dropIndex('deal_person_deal_id_index');
            $table->dropIndex('deal_person_person_id_index');
        });

        Schema::rename('deal_person', 'opportunity_contact');

        Schema::table('people', function (Blueprint $table) {
            $table->dropForeign('people_user_id_foreign');
            $table->dropForeign('people_company_id_foreign');
            $table->dropForeign('people_status_id_foreign');
            $table->dropIndex('people_published_index');
            $table->dropColumn('company_id');
        });

        Schema::rename('people', 'contacts');

        Schema::table('deals', function (Blueprint $table) {
            $table->dropForeign('deals_user_id_foreign');
            $table->dropForeign('deals_stage_id_foreign');
            $table->dropIndex('deals_stage_id_index');
            $table->dropColumn('company_id');
        });

        Schema::rename('deals', 'opportunities');

        Schema::table('company_entities', function (Blueprint $table) {
            $table->dropForeign('company_entities_company_id_foreign');
            $table->dropIndex('company_entities_company_id_index');
            $table->dropIndex('company_entities_entity_id_entity_type_index');
        });

        Schema::rename('company_entities', 'company_xref');

        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn('deal_id');
            $table->dropColumn('company_id');
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
