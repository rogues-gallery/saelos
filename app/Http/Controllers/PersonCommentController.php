<?php

namespace App\Http\Controllers;

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

        NoteAdded::broadcast($note);

        return $note;
    }
}
