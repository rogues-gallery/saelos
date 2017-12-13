<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Resources\CompanyCollection;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Company as CompanyResource;

class CompanyController extends Controller
{
    public function index()
    {
        return new CompanyCollection(Company::with(['user','people', 'deals'])->paginate());
    }

    public function show($id)
    {
        return new CompanyResource(Company::with(['user', 'people', 'deals'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $data = $request->all();
        $companyUser = isset($data['user']) ? $data['user'] : [];

        if ($companyUser) {
            $user = User::findOrFail($companyUser['id']);
            $user->update($companyUser);

            $company->user()->associate($user);
        }

        $company->update($data);

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
