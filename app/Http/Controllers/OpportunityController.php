<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Stage;
use Auth;
use App\Company;
use App\Opportunity;
use App\Http\Resources\OpportunityCollection;
use Carbon\Carbon;
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
        'tags',
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
        'tags',
    ];

    public function index(Request $request)
    {
        $opportunities = Opportunity::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $opportunities = Opportunity::search($searchParams, $opportunities);
        }

        if ($modifiedSince = $request->get('modified_since')) {
            $opportunities->where('updated_at', '>', new Carbon($modifiedSince));
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

        $companyIds = [];
        foreach ($companies as $company) {
            $companyIds[$company['id']] = [
                'primary' => $company['pivot']['primary'] ?? 0,
                'position' => $company['pivot']['position'] ?? ''
            ];
        }

        $contactIds = [];
        foreach ($contacts as $contact) {
            $contactIds[$contact['id']] = [
                'primary' => $contact['pivot']['primary'] ?? 0,
                'position' => $contact['pivot']['position'] ?? ''
            ];
        }

        if ($opportunityStage) {
            $stage = Stage::findOrFail($opportunityStage);

            $opportunity->stage()->associate($stage);
        }

        $opportunity->companies()->sync($companyIds);
        $opportunity->contacts()->sync($contactIds);
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


    public function count(Request $request)
    {
        $groupBy = $request->get('groupBy');
        $user = \Auth::user();

        $count = DB::table('opportunities')
            ->select($groupBy, DB::raw('count(*) as total'))
            ->where('user_id', $user->id)
            ->groupBy($groupBy)
            ->pluck('total', $groupBy);
        return $count;
    }
}
