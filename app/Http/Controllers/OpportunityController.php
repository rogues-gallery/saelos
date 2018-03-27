<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Stage;
use Auth;
use App\Company;
use App\Opportunity;
use App\Http\Resources\OpportunityCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Opportunity as OpportunityResource;

class OpportunityController extends Controller
{
    const INDEX_WITH = [
        'user',
        'team',
        'companies',
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'stage',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
    ];

    const SHOW_WITH = [
        'activities',
        'activities.details',
        'user',
        'team',
        'companies',
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'stage',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
    ];

    public function index(Request $request)
    {
        $opportunities = Opportunity::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $opportunities = Opportunity::search($searchParams, $opportunities);
        }

        return new OpportunityCollection($opportunities->paginate());
    }

    public function show($id)
    {
        return new OpportunityResource(Opportunity::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Opportunity $opportunity */
        $opportunity = Opportunity::findOrFail($id);
        $data = $request->all();
        $companies = $data['companies'] ?? [];
        $customFields = $data['custom_fields'] ?? [];
        $opportunityStage = $data['stage_id'] ?? null;
        $contacts = $data['contacts'] ?? null;

        foreach ($companies as $opportunityCompany) {
            $company = Company::findOrFail($opportunityCompany['id']);

            if ($opportunity->companies()->get()->contains('id', $company->id)) {
                $opportunity->companies()->updateExistingPivot($company->id, [
                    'primary' => $opportunityCompany['pivot']['primary'] ?? 0
                ]);
            } else {
                $opportunity->companies()->save($company, [
                    'primary' => $opportunityCompany['pivot']['primary'] ?? 0
                ]);
            }
        }

        if ($opportunityStage) {
            $stage = Stage::findOrFail($opportunityStage);

            $opportunity->stage()->associate($stage);
        }

        if ($contacts) {
            $toSync = [];

            foreach ($contacts as $i => $opportunityContact) {
                $contact = Contact::findOrFail($opportunityContact['id']);

                $toSync[$contact->id] = ['primary' => $i === 0];
            }

            $opportunity->contacts()->sync($toSync);
        }

        $opportunity->user()->associate(Auth::user());
        $opportunity->update($data);
        $opportunity->assignCustomFields($customFields);

        return $this->show($opportunity->id);
    }

    public function store(Request $request)
    {
        $opportunity = Opportunity::create($request->all());

        return $this->update($request, $opportunity->id);
    }

    public function destroy($id)
    {
        Opportunity::findOrFail($id)->delete();

        return '';
    }
}
