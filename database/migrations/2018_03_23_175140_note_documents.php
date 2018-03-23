<?php

use App\Document;
use App\Note;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NoteDocuments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->integer('note_id')->unsigned()->nullable();
            $table->foreign('note_id')->references('id')->on('notes');
        });

        Document::chunk(100, function ($documents) {
            foreach ($documents as $document) {
                $note = Note::create([
                    'name' => 'Document uploaded',
                    'note' => $document->name,
                    'entity_id' => $document->entity_id,
                    'entity_type' => $document->entity_type,
                    'user_id' => $document->user_id
                ]);

                $note->document()->save($document);
            }
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn(['entity_id', 'entity_type']);
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
