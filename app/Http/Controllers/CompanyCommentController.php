<?php

namespace App\Http\Controllers;

use Auth;
use App\Events\NoteAdded;
use App\Note;
use App\Company;
use Illuminate\Http\Request;

class CompanyCommentController extends Controller
{
    /**
     * @param Request $request
     * @param Company  $company
     *
     * @return mixed
     */
    public function store(Request $request, Company $company)
    {
        $note = Note::create([
            'name' => $request->get('name'),
            'note' => $request->get('note')
        ]);

        $note->entity()->associate($company)->save();
        $note->user()->associate(Auth::user())->save();
        $note->load('entity');

        NoteAdded::broadcast($note);

        return $note;
    }
}
