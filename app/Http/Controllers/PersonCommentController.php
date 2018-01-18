<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\User;
use Auth;
use App\Events\NoteAdded;
use App\Note;
use App\Person;
use Illuminate\Http\Request;

class PersonCommentController extends Controller
{
    /**
     * @param Request $request
     * @param Person  $person
     *
     * @return mixed
     */
    public function store(Request $request, Person $person)
    {
        $note = Note::create([
            'name' => $request->get('name'),
            'note' => $request->get('note')
        ]);

        $note->entity()->associate($person)->save();
        $note->user()->associate(Auth::user())->save();
        $note->load(['entity', 'user']);

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $person->load([
                'user',
                'company',
                'deals',
                'activities',
                'activities.details',
                'customFields',
                'notes',
                'notes.user',
            ]);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                $user->notify(new Mentioned($user, $person));
            }
        }

        NoteAdded::broadcast($note);

        return $note;
    }
}
