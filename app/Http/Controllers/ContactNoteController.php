<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\Document;
use App\User;
use Auth;
use App\Note;
use App\Contact;
use Illuminate\Http\Request;

/**
 * @resource Contact Notes
 */
class ContactNoteController extends Controller
{
    /**
     * Fetch notes for Contact
     * 
     * @resource Contact
     * 
     * @param Request $request
     * @param Contact $contact
     * 
     * @return array
     */
    public function index(Request $request, Contact $contact)
    {
        return $contact->notes();
    }

    /**
     * Fetch a single Contact note.
     * 
     * @param Contact $contact
     * @param Note    $note
     * 
     * @return Note
     */
    public function show(Contact $contact, Note $note)
    {
        return $note;
    }

    /**
     * Update an existing Contact note.
     * 
     * @param Request $request
     * @param Contact $contact
     * @param Note     $note
     * 
     * @return Note
     */
    public function update(Request $request, Contact $contact, Note $note)
    {
        $note->note = $request->get('note_content');
        $note->name = $request->get('note_name');
        $note->private = (int)$request->get('private');

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

        $note->load(['user']);

        return $note;
    }

    /**
     * Save a new Contact note.
     * 
     * @param Request $request
     * @param Contact $contact
     *
     * @return mixed
     */
    public function store(Request $request, Contact $contact)
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

        $note->entity()->associate($contact)->save();
        $note->user()->associate(Auth::user())->save();
        $note->save();
        $note->load(['entity', 'user', 'document']);

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $contact->load(ContactController::SHOW_WITH);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                if ($user) {
                    $user->notify(new Mentioned($user, $contact));
                }
            }
        }

        return $note;
    }

    /**
     * Delete a Contact note.
     * 
     * @param Contact $contact
     * @param Note    $note
     * 
     * @return array
     */
    public function destroy(Contact $contact, Note $note)
    {
        $note->document()->delete();
        $note->delete();

        return ['data' => $note];
    }
}
