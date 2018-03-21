
<?php

use App\Company;
use App\Opportunity;
use App\Contact;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CompaniesPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_entities', function(Blueprint $table) {
            $table->increments('id');
            $table->morphs('entity');
            $table->integer('company_id')->unsigned()->index();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->boolean('primary')->default(false);
            $table->text('position')->nullable();
        });

        Opportunity::chunk(100, function($deals) {
            foreach ($deals as $deal) {
                if ($deal->company_id) {
                    \DB::table('company_entities')->insert([
                        'entity_id' => $deal->id,
                        'entity_type' => Opportunity::class,
                        'company_id' => $deal->company_id,
                        'primary' => true
                    ]);
                }
            }
        });

        Contact::chunk(100, function($people) {
            foreach ($people as $person) {
                if ($person->company_id) {
                    \DB::table('company_entities')->insert([
                        'entity_id' => $person->id,
                        'entity_type' => Contact::class,
                        'company_id' => $person->company_id,
                        'primary' => true,
                        'position' => $person->position
                    ]);
                }
            }
        });

        Schema::table('deals', function(Blueprint $table) {
            $table->dropIndex('deals_company_id_foreign');
            $table->dropColumn('company_id');
        });

        Schema::table('people', function(Blueprint $table) {
            $table->dropIndex('people_company_id_foreign');
            $table->dropColumn('company_id');
            $table->dropColumn('position');
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
