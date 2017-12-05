<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Http\Request;
use App\Http\Resources\Person as PersonResource;

class PersonController extends Controller
{
    public function index()
    {
        return view('admin.people.index');
    }

    public function show($id)
    {
        return Person::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $company = Person::findOrFail($id);
        $company->update($request->all());

        return $company;
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
