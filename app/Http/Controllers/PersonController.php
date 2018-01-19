<?php

namespace App\Http\Controllers;

use App\Events\ContactEmailed;
use App\Mail\Contact;
use App\Notifications\PersonUpdated;
use App\User;
use Auth;
use App\Company;
use App\CustomField;
use App\CustomFieldValue;
use App\Events\ContactUpdated;
use App\Http\Resources\PersonCollection;
use App\Person;
use Illuminate\Http\Request;
use App\Http\Resources\Person as PersonResource;
use Illuminate\Support\Facades\Mail;

class PersonController extends Controller
{
    private $indexWith = [
        'user',
        'company',
        'deals',
        'deals.people',
        'activities',
        'activities.details',
        'customFields',
        'notes',
        'notes.user',
    ];

    private $showWith = [
        'user',
        'company',
        'deals',
        'deals.people',
        'activities',
        'activities.details',
        'customFields',
        'notes',
        'notes.user',
    ];

    public function index(Request $request)
    {
        $people = Person::with($this->indexWith);

        $people->where('published', 1);
        $people->where(function($q) use ($request) {
            if ($firstName = $request->get('first_name')) {
                $q->orWhere('first_name', 'like', '%'.$firstName.'%');
            }

            if ($lastName = $request->get('last_name')) {
                $q->orWhere('last_name', 'like', '%'.$lastName.'%');
            }

            if ($email = $request->get('email')) {
                $q->orWhere('email', 'like', '%'.$email.'%');
            }
        });

        if ($modifiedSince = $request->get('modified_since')) {
            $people->where('updated_at', '>=', $modifiedSince);
        }

        return new PersonCollection($people->paginate());
    }

    public function show($id)
    {
        return new PersonResource(Person::with($this->showWith)->find($id));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @TODO: Move company update to Model mutators
     *
     * @return Person
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        /** @var Person $person */
        $person = Person::findOrFail($id);
        $data = $request->all();
        $personCompany = $data['company'] ?? [];
        $personUser = $data['user'] ?? [];
        $customFields = $data['custom_fields'] ?? [];

        if ($personCompany) {
            $company = array_key_exists('id', $personCompany)
                ? Company::findOrFail($personCompany['id'])
                : new Company;

            $company->update($personCompany);

            $person->company()->associate($company);
        }

        $user = User::find($personUser) ?? Auth::user();

        $person->user()->associate($user);
        $person->update($data);
        $person->assignCustomFields($customFields);

        Auth::user()->notify(new PersonUpdated($person));

        return $this->show($person->id);
    }

    /**
     * @param Request $request
     *
     * @return Person
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $person = Person::create($request->all());

        return $this->update($request, $person->id);
    }

    /**
     * @param $id
     *
     * @return string
     * @throws \Exception
     */
    public function destroy($id)
    {
        Person::findOrFail($id)->delete();

        return '';
    }

    public function email(Request $request, int $id)
    {
        $person = Person::findOrFail($id);
        $user = Auth::user();

        Mail::to($person->email)
            ->send(new Contact($request->get('emailContent'), $request->get('emailSubject')));

        ContactEmailed::dispatch($person, $user);

        return 1;
    }
}
