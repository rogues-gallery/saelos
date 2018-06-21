<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\Document;
use App\User;
use Auth;
use App\Note;
use App\Company;
use App\Http\Requests\StoreNoteRequest;
use Illuminate\Http\Request;

/**
 * @resource Company Notes
 */
class CompanyNoteController extends Controller
{
    /**
     * Fetch notes for Company
     * 
     * @resource Company
     * 
     * @param Request $request
     * @param Company $company
     * 
     * @return array
     */
    public function index(Request $request, Company $company)
    {
        return $company->notes();
    }

    /**
     * Fetch a single Company note.
     * 
     * @param Company $company
     * @param Note    $note
     * 
     * @return Note
     */
    public function show(Company $company, Note $note)
    {
        return $note;
    }

    /**
     * Update an existing Company note.
     * 
     * @param StoreNoteRequest $request
     * @param Company          $company
     * @param Note             $note
     * 
     * @return Note
     */
    public function update(StoreNoteRequest $request, Company $company, Note $note)
    {
        $note->note = $request->get('note_content');
        $note->name = $request->get('note_name');
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
     * Save a new Company note.
     * 
     * @param StoreNoteRequest $request
     * @param Company          $company
     *
     * @return Note
     */
    public function store(StoreNoteRequest $request, Company $company)
    {
        $note = Note::create([
            'name' => $request->get('note_name'),
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

        $note->entity()->associate($company)->save();
        $note->user()->associate(Auth::user())->save();
        $note->save();
        $note->load(['entity', 'user', 'document']);

        /**
         * @TODO Move this to an observor that notifies
         */
        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $company->load(CompanyController::SHOW_WITH);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                if ($user) {
                    $user->notify(new Mentioned($user, $company));
                }
            }
        }

        return $note;
    }

    /**
     * Delete a Company note.
     * 
     * @param Company $company
     * @param Note    $note;
     * 
     * @return array
     */
    public function destroy(Company $company, Note $note)
    {
        $note->document()->delete();
        $note->delete();

        return ['data' => $note];
    }
}
