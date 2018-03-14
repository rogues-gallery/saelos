<?php

namespace App\Http\Controllers;

use App\Events\ContactEmailed;
use App\Mail\Contact;
use App\Notifications\PersonEmailed;
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
    const INDEX_WITH = [
        'user',
        'companies',
        'deals',
        'deals.companies',
        'deals.people',
        'deals.notes',
        'deals.notes.user',
        'documents',
        'documents.user',
        'activities',
        'activities.details',
        'activities.user',
        'customFields',
        'customFields.customField',
        'notes',
        'notes.user',
    ];

    const SHOW_WITH = [
        'user',
        'companies',
        'deals',
        'deals.companies',
        'deals.people',
        'deals.notes',
        'deals.notes.user',
        'documents',
        'documents.user',
        'activities',
        'activities.details',
        'activities.user',
        'customFields',
        'customFields.customField',
        'notes',
        'notes.user',
    ];

    const SEARCH_PARAMS = [
        // 'key_to_look_for' => 'regex'
    ];

    public function index(Request $request)
    {
        $people = Person::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $people = Person::search($searchString, $people);
        }

        $people->orderBy('people.id', 'desc');

        return new PersonCollection($people->paginate());
    }

    public function show($id)
    {
        return new PersonResource(Person::with(static::SHOW_WITH)->find($id));
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
        $personUser = $data['user'] ?? null;
        $customFields = $data['custom_fields'] ?? [];

        if ($personCompany) {
            $company = array_key_exists('id', $personCompany)
                ? Company::findOrFail($personCompany['id'])
                : new Company;

            $company->update($personCompany);

            $data['company_id'] = $company->id;
        }

        if ($personUser) {
            $user = User::find($personUser);
        } else {
            $user = Auth::user();
        }

        if (isset($data['user_id']) && is_string($data['user_id']) && !is_numeric($data['user_id'])) {
            $user = User::where('name', $data['user_id'])->first();
            unset($data['user_id']);
        }

        $person->user()->associate($user);
        $person->update($data);
        $person->assignCustomFields($customFields);

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
        $data = $request->all();

        if (isset($data['email'])) {
            $person = Person::where('email', '=', $data['email'])->first();
        }

        if (!isset($person)) {
            unset($data['user_id']);
            $person = Person::create($data);
        }

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
        $email = new Contact($request->get('emailContent'), $request->get('emailSubject'));

        Mail::to($person->email)
            ->send($email);

        ContactEmailed::dispatch($person, $user, $email);
        \Auth::user()->notify(new PersonEmailed($person));

        return 1;
    }
}
