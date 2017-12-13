<?php

namespace App\Http\Controllers;

use App\Company;
use App\Deal;
use App\Http\Resources\DealCollection;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    public function index()
    {
        return new DealCollection(Deal::with(['user', 'team', 'company', 'people', 'stage'])->paginate());
    }

    public function show($id)
    {
        return new DealResource(Deal::with(['user', 'team', 'company', 'people', 'stage'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $deal = Deal::findOrFail($id);
        $data = $request->all();
        $dealUser = isset($data['user']) ? $data['user'] : [];
        $dealCompany = isset($data['company']) ? $data['company'] : [];

        if ($dealUser) {
            $user = User::findOrFail($dealUser['id']);
            $user->update($dealUser);

            $deal->user()->associate($user);
        }

        if ($dealCompany) {
            $company = Company::findOrFail($dealCompany['id']);
            $company->update($dealCompany);

            $deal->company()->associate($company);
        }

        $deal->update($data);

        return $deal;
    }

    public function store(Request $request)
    {
        return Deal::create($request->all());
    }

    public function destroy($id)
    {
        Deal::findOrFail($id)->delete();

        return '';
    }
}
