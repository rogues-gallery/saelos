<?php

namespace App\Http\Controllers;

use App\Notifications\DealUpdated;
use App\Person;
use App\Stage;
use Auth;
use App\Company;
use App\Deal;
use App\Http\Resources\DealCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    const INDEX_WITH = [
        'user',
        'team',
        'company',
        'people',
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
        'user',
        'team',
        'company',
        'people',
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
        return new DealResource(Deal::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Deal $deal */
        $deal = Deal::findOrFail($id);
        $data = $request->all();
        $dealCompany = $data['company'] ?? [];
        $customFields = $data['custom_fields'] ?? [];
        $dealStage = $data['stage_id'] ?? null;
        $dealPeople = $data['people'] ?? null;

        if ($dealCompany) {
            $company = Company::findOrFail($dealCompany['id']);
            $company->update($dealCompany);

            $deal->company()->associate($company);
        }

        if ($dealStage) {
            $stage = Stage::findOrFail($dealStage);

            $deal->stage()->associate($stage);
        }

        if ($dealPeople) {
            $toSync = [];

            foreach ($dealPeople as $i => $dealPerson) {
                $person = Person::findOrFail($dealPerson['id']);

                $toSync[$person->id] = ['primary' => $i === 0];
            }

            $deal->people()->sync($toSync);
        }

        $deal->user()->associate(Auth::user());
        $deal->update($data);
        $deal->assignCustomFields($customFields);

        \App\Events\DealUpdated::broadcast($deal);
        Auth::user()->notify(new DealUpdated($deal));

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
