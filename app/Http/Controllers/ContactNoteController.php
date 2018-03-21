<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\User;
use Auth;
use App\Events\NoteAdded;
use App\Note;
use App\Contact;
use Illuminate\Http\Request;

class ContactNoteController extends Controller
{
    public function update(Request $request, Contact $contact, Note $note)
    {
        $note->update($request->all());
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
            'note' => $request->get('note')
        ]);

        $note->entity()->associate($contact)->save();
        $note->user()->associate(Auth::user())->save();
        $note->load(['entity', 'user']);

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

        NoteAdded::broadcast($note);

        return $note;
    }

    public function destroy(Contact $contact, Note $note)
    {
        $note->delete();
    }
}
