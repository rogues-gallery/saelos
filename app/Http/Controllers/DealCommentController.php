<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\User;
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

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $deal->load([
                'user',
                'team',
                'company',
                'people',
                'stage',
                'customFields',
                'notes',
                'notes.user',
            ]);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                $user->notify(new Mentioned($user, $deal));
            }
        }

        NoteAdded::broadcast($note);

        return $note;
    }
}
