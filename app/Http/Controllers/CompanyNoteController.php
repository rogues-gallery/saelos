<?php

namespace App\Http\Controllers;

use App\Notifications\Mentioned;
use App\Document;
use App\User;
use Auth;
use App\Note;
use App\Company;
use Illuminate\Http\Request;

class CompanyNoteController extends Controller
{
    public function update(Request $request, Company $company, Note $note)
    {
        $note->update($request->all());

        return $note;
    }

    /**
     * @param Request $request
     * @param Company  $company
     *
     * @return mixed
     */
    public function store(Request $request, Company $company)
    {
        $note = Note::create([
            'name' => $request->get('note_name'),
            'note' => $request->get('note_content'),
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

        $note->entity()->associate($company)->save();
        $note->user()->associate(Auth::user())->save();
        $note->save();
        $note->load(['entity', 'user', 'document']);

        $mentions = preg_match_all('/@([^@ ]+)/', $request->get('note'), $matches);

        if ($mentions > 0) {
            $company->load(CompanyController::SHOW_WITH);

            foreach ($matches[1] as $username) {
                $user = User::where('username', '=', $username)->first();

                if ($user) {
                    $user->notify(new Mentioned($user, $company));
                }
            }
        }

        return $note;
    }

    public function destroy(Company $company, Note $note)
    {
        $note->document()->delete();
        $note->delete();

        return ['data' => $note];
    }
}
