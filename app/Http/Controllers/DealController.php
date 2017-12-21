<?php

namespace App\Http\Controllers;

use Auth;
use App\Company;
use App\Deal;
use App\Http\Resources\DealCollection;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    private $indexWith = ['user', 'team', 'company', 'people', 'stage', 'customFields'];
    private $showWith = ['user', 'team', 'company', 'people', 'stage', 'customFields'];

    public function index()
    {
        return new DealCollection(Deal::with($this->indexWith)->paginate());
    }

    public function show($id)
    {
        return new DealResource(Deal::with($this->showWith)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Deal $deal */
        $deal = Deal::findOrFail($id);
        $data = $request->all();
        $dealCompany = $data['company'] ?? [];
        $customFields = $data['custom_fields'] ?? [];

        if ($dealCompany) {
            $company = Company::findOrFail($dealCompany['id']);
            $company->update($dealCompany);

            $deal->company()->associate($company);
        }

        $deal->user()->associate(Auth::user());
        $deal->update($data);
        $deal->assignCustomFields($customFields);

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
