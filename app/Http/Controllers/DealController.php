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
        'company',
        'people',
        'people.company',
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
        'company',
        'people',
        'people.company',
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
        $with = static::SHOW_WITH;

        unset($with[0]);

        $with['activities'] = function(Builder $q) use ($id) {
            $q->whereNested(function($q) use ($id) {
                $q->where('deal_id', $id);
            }, 'or');
        };

        return new DealResource(Deal::with($with)->find($id));
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

        if ($dealCompany && isset($dealCompany['id'])) {
            $company = Company::findOrFail($dealCompany['id']);

            $company->update($dealCompany);

            $data['company_id'] = $company->id;
        } else {
            $deal->company()->dissociate()->save();
            $data['company_id'] = null;
            unset($data['company']);
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
