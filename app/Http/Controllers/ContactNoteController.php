<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\Document;
use App\User;
use Auth;
use App\Note;
use App\Contact;
use Illuminate\Http\Request;

class ContactNoteController extends Controller
{
    public function update(Request $request, Contact $contact, Note $note)
    {
        $note->update($request->all());

        return $note;
    }

    /**
     * @param Request $request
     * @param Contact $contact
     *
     * @return mixed
     */
    public function store(Request $request, Contact $contact)
    {
        $note = Note::create([
            'name' => $request->get('name'),
            'note' => $request->get('note'),
            'private' => (int) $request->get('private')
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');

            if ($file->isValid()) {
                $path = public_path('/uploads/');
                $name = md5(time().$file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
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

    public function destroy(Contact $contact, Note $note)
    {
        $note->document()->delete();
        $note->delete();

        return ['data' => $note];
    }
}
