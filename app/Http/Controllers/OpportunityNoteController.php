<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\User;
use Auth;
use App\Events\NoteAdded;
use App\Note;
use App\Opportunity;
use Illuminate\Http\Request;

class OpportunityNoteController extends Controller
{
    /**
     * @param Request     $request
     * @param Opportunity $opportunity
     *
     * @return mixed
     */
    public function store(Request $request, Opportunity $opportunity)
    {
        $note = Note::create([
            'name' => $request->get('name'),
            'note' => $request->get('note')
        ]);

        $note->entity()->associate($opportunity)->save();
        $note->user()->associate(Auth::user())->save();
        $note->load(['entity', 'user']);

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

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
}
