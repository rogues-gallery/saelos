<?php

namespace App\Http\Controllers;

use App\Events\DealUpdated;
use Auth;
use App\Company;
use App\Deal;
use App\Http\Resources\DealCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    private $indexWith = [
        'user',
        'team',
        'company',
        'people',
        'stage',
        'customFields',
        'notes',
    ];

    private $showWith = [
        'user',
        'team',
        'company',
        'people',
        'stage',
        'customFields',
        'notes',
    ];

    public function index(Request $request)
    {
        $deals = Deal::with($this->indexWith);

        $deals->where('published', 1);
        $deals->where(function($q) use ($request) {
            if ($name = $request->get('name')) {
                $q->orWhere('name', 'like', '%'.$name.'%');
            }
        });

        return new DealCollection($deals->paginate());
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

        DealUpdated::broadcast($deal);

        return $this->show($deal->id);
    }

    public function store(Request $request)
    {
        $deal = Deal::create($request->all());

        return $this->update($request, $deal->id);
    }

    public function destroy($id)
    {
        Deal::findOrFail($id)->delete();

        return '';
    }
}
