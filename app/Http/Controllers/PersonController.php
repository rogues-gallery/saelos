<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Resources\PersonCollection;
use App\Person;
use App\Stage;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Person as PersonResource;

class PersonController extends Controller
{
    private $indexWith = [
        'user',
        'company',
        'deals',
        'activities',
        'activities.details',
        'customFields',
    ];

    private $showWith = [
        'user',
        'company',
        'deals',
        'activities',
        'activities.details',
        'customFields',
    ];

    public function index()
    {
        return new PersonCollection(Person::with($this->indexWith)->paginate());
    }

    public function show($id)
    {
        return new PersonResource(Person::with($this->showWith)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Person $person */
        $person = Person::findOrFail($id);
        $data = $request->all();
        $personCompany = $data['company'] ?? [];
        $personUser = $data['user'] ?? [];

        if ($personCompany) {
            $company = Company::findOrFail($personCompany['id']);
            $company->update($personCompany);

            $person->company()->associate($company);
        }

        if ($personUser) {
            $user = User::findOrFail($personUser['id']);
            $user->update($personUser);

            $person->user()->associate($user);
        }

        $person->update($data);

        return $person;
    }

    public function store(Request $request)
    {
        return Person::create($request->all());
    }

    public function destroy($id)
    {
        Person::findOrFail($id)->delete();

        return '';
    }
}
