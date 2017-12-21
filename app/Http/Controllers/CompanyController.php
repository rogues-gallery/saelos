<?php

namespace App\Http\Controllers;

use Auth;
use App\Company;
use App\Http\Resources\CompanyCollection;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Company as CompanyResource;

class CompanyController extends Controller
{
    private $indexWith = ['user','people', 'deals', 'customFields'];
    private $showWith = ['user','people', 'deals', 'customFields'];

    public function index()
    {
        return new CompanyCollection(Company::with($this->indexWith)->paginate());
    }

    public function show($id)
    {
        return new CompanyResource(Company::with($this->showWith)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Company $company */
        $company = Company::findOrFail($id);
        $data = $request->all();
        $customFields = $data['custom_fields'] ?? [];

        $company->user()->associate(Auth::user());
        $company->update($data);
        $company->assignCustomFields($customFields);

        return $company;
    }

    public function store(Request $request)
    {
        return Company::create($request->all());
    }

    public function destroy($id)
    {
        Company::findOrFail($id)->delete();

        return '';
    }
}
