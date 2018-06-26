<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\Document;
use App\User;
use Auth;
use App\Note;
use App\Opportunity;
use App\Http\Requests\StoreNoteRequest;
use Illuminate\Http\Request;

/**
 * @resource Opportunity Notes
 */
class OpportunityNoteController extends Controller
{
    /**
     * Fetch notes for Opportunity
     * 
     * @resource Opportunity
     * 
     * @param Request     $request
     * @param Opportunity $opportunity
     * 
     * @return array
     */
    public function index(Request $request, Opportunity $opportunity)
    {
        return $opportunity->notes();
    }

    /**
     * Fetch a single Opportunity note.
     * 
     * @param Opportunity $opportunity
     * @param Note        $note
     * 
     * @return Note
     */
    public function show(Opportunity $opportunity, Note $note)
    {
        return $note;
    }

    /**
     * Update an existing Opportunity note.
     * 
     * @param StoreNoteRequest $request
     * @param Opportunity      $opportunity
     * @param Note             $note
     * 
     * @reutrn Note
     */
    public function update(StoreNoteRequest $request, Opportunity $opportunity, Note $note)
    {
        $note->note = $request->get('note_content');
        $note->private = $request->get('private');

        $note->save();

        if ($request->hasFile('document')) {
            $file = $request->file('document');

            if ($file->isValid()) {
                $path = public_path('/uploads/');
                $name = md5(time() . $file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
                $size = $file->getSize();
                $mime = $file->getMimeType();
                $file->move($path, $name);

                $document = Document::create([
                    'name' => $file->getClientOriginalName(),
                    'filename' => $name,
                    'size' => $size,
                    'mimetype' => $mime
                ]);

                $note->document()->save($document);
            }
        }

        return $note;
    }

    /**
     * Save a new Opportunity note.
     * 
     * @param StoreNoteRequest $request
     * @param Opportunity      $opportunity
     *
     * @return Note
     */
    public function store(StoreNoteRequest $request, Opportunity $opportunity)
    {
        $note = Note::create([
            'note' => $request->get('note_content'),
            'private' => (int)$request->get('private')
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');

            if ($file->isValid()) {
                $path = public_path('/uploads/');
                $name = md5(time() . $file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
                $size = $file->getSize();
                $mime = $file->getMimeType();
                $file->move($path, $name);

                $document = Document::create([
                    'name' => $file->getClientOriginalName(),
                    'filename' => $name,
                    'size' => $size,
                    'mimetype' => $mime
                ]);

                $note->document()->save($document);
            }
        }

        $note->entity()->associate($opportunity)->save();
        $note->user()->associate(Auth::user())->save();
        $note->save();
        $note->load(['entity', 'user', 'document']);

        $mentions = preg_match_all('/@([^@\s<]+|[a-z]+)/i', $request->get('note_content'), $matches);

        if ($mentions > 0) {
            $opportunity->load(OpportunityController::SHOW_WITH);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                if ($user) {
                    $user->notify(new Mentioned($user, $opportunity));
                }
            }
        }

        return $note;
    }

    /**
     * Delete an Opportunity note.
     * 
     * @param Opportunity $opportunity
     * @param Note        $note
     * 
     * @return array
     */
    public function destroy(Opportunity $opportunity, Note $note)
    {
        $note->document()->delete();
        $note->delete();

        return ['data' => $note];
    }
}
