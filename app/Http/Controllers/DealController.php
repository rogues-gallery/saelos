<?php

namespace App\Http\Controllers;

use App\Notifications\DealUpdated;
use App\Person;
use App\Stage;
use Auth;
use App\Company;
use App\Deal;
use App\Http\Resources\DealCollection;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    const INDEX_WITH = [
        'user',
        'team',
        'companies',
        'people',
        'people.companies',
        'people.deals',
        'people.deals.people',
        'stage',
        'customFields',
        'customFields.customField',
        'notes',
        'notes.user',
        'documents',
        'documents.user',
    ];

    const SHOW_WITH = [
        'activities',
        'activities.details',
        'user',
        'team',
        'companies',
        'people',
        'people.companies',
        'people.deals',
        'people.deals.people',
        'stage',
        'customFields',
        'customFields.customField',
        'notes',
        'notes.user',
        'documents',
        'documents.user',
    ];

    public function index(Request $request)
    {
        $deals = Deal::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $deals = Deal::search($searchString, $deals);
        }

        return new DealCollection($deals->paginate());
    }

    public function show($id)
    {
        return new DealResource(Deal::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Deal $deal */
        $deal = Deal::findOrFail($id);
        $data = $request->all();
        $companies = $data['companies'] ?? [];
        $customFields = $data['custom_fields'] ?? [];
        $dealStage = $data['stage_id'] ?? null;
        $people = $data['people'] ?? null;

        foreach ($companies as $dealCompany) {
            $company = Company::findOrFail($dealCompany['id']);

            if ($deal->companies()->get()->contains('id', $company->id)) {
                $deal->companies()->updateExistingPivot($company->id, [
                    'primary' => $dealCompany['pivot']['primary'] ?? 0
                ]);
            } else {
                $deal->companies()->save($company, [
                    'primary' => $dealCompany['pivot']['primary'] ?? 0
                ]);
            }
        }

        if ($dealStage) {
            $stage = Stage::findOrFail($dealStage);

            $deal->stage()->associate($stage);
        }

        if ($people) {
            $toSync = [];

            foreach ($people as $i => $dealPerson) {
                $deal = Person::findOrFail($dealPerson['id']);

                $toSync[$deal->id] = ['primary' => $i === 0];
            }

            $deal->people()->sync($toSync);
        }

        $deal->user()->associate(Auth::user());
        $deal->update($data);
        $deal->assignCustomFields($customFields);

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
