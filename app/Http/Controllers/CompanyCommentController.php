<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\User;
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
        $note->load(['entity', 'user']);

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $company->load([
                'user',
                'people',
                'deals',
                'customFields',
                'notes',
                'notes.user',
            ]);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                if ($user) {
                    $user->notify(new Mentioned($user, $company));
                }
            }
        }

        NoteAdded::broadcast($note);

        return $note;
    }
}
