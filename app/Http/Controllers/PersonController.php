<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Resources\PersonCollection;
use App\Person;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Person as PersonResource;

class PersonController extends Controller
{
    public function index()
    {
        return new PersonCollection(Person::with(['user', 'company', 'deals'])->paginate());
    }

    public function show($id)
    {
        return Person::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $data = $request->all();
        $personCompany = isset($data['company']) ? $data['company'] : [];
        $personUser = isset($data['user']) ? $data['user'] : [];

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
        $company = Person::findOrFail($id);
        $company->delete();

        return '';
    }
}
