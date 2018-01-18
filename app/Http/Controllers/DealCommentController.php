<?php

namespace App\Http\Controllers;

use Auth;
use App\Events\NoteAdded;
use App\Note;
use App\Deal;
use Illuminate\Http\Request;

class DealCommentController extends Controller
{
    /**
     * @param Request $request
     * @param Deal  $deal
     *
     * @return mixed
     */
    public function store(Request $request, Deal $deal)
    {
        $note = Note::create([
            'name' => $request->get('name'),
            'note' => $request->get('note')
        ]);

        $note->entity()->associate($deal)->save();
        $note->user()->associate(Auth::user())->save();
        $note->load(['entity', 'user']);

        NoteAdded::broadcast($note);

        return $note;
    }
}
