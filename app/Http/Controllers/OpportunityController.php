<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Stage;
use Auth;
use App\Company;
use App\Opportunity;
use App\Http\Requests\StoreOpportunityRequest;
use App\Http\Resources\OpportunityCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\Opportunity as OpportunityResource;

/**
 * @resource Opportunities
 * 
 * Interact with Opportunities
 */
class OpportunityController extends Controller
{
    use Exportable;

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

    /**
     * Fetching a filtered Opportunities list.
     * 
     * @param Request $request
     * 
     * @return OpportunityCollection
     */
    public function index(Request $request)
    {
        $opportunities = Opportunity::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $opportunities = Opportunity::search($searchParams, $opportunities);
        }

        if ($modifiedSince = $request->get('modified_since')) {
            $opportunities->where('updated_at', '>', new Carbon($modifiedSince));
        }

        if ($request->get('export', false)) {
            return $this->exportQueryBuilder($opportunities, Opportunity::class);
        }

        return new OpportunityCollection($opportunities->paginate());
    }

    /**
     * Fetch a single Opportunity
     * 
     * @param Opportunity $opportunity
     * 
     * @return OpportunityResource
     */
    public function show(Opportunity $opportunity)
    {
        return new OpportunityResource($opportunity->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Opportunity
     * 
     * @param StoreOpportunityRequest $request
     * @param Opportunity             $opportunity
     * 
     * @return OpportunityResource
     */
    public function update(StoreOpportunityRequest $request, Opportunity $opportunity)
    {
        $data = $request->all();
        $companies = $data['companies'] ?? [];
        $customFields = $data['custom_fields'] ?? [];
        $opportunityStage = $data['stage_id'] ?? null;
        $contacts = $data['contacts'] ?? [];

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

        $opportunity->user()->associate(Auth::user());
        $opportunity->companies()->sync($companyIds);
        $opportunity->contacts()->sync($contactIds);
        $opportunity->update($data);
        $opportunity->assignCustomFields($customFields);

        return $this->show($opportunity);
    }

    /**
     * Save a new Opportunity
     * 
     * @param StoreOpportunityRequest $request
     * 
     * @return OpportunityResource
     */
    public function store(StoreOpportunityRequest $request)
    {
        $opportunity = Opportunity::create($request->all());

        return $this->update($request, $opportunity);
    }

    /**
     * Delete an Opportunity
     * 
     * @param Opportunity $opportunity
     * 
     * @return string
     */
    public function destroy(Opportunity $opportunity)
    {
        $opportunity->delete();

        return '';
    }

    /**
     * Get a count of Opportunities.
     * 
     * The count returned represents the number of opportunities assigned
     * to the requesting user that are grouped by the given groupBy
     * request parameter.
     * 
     * @param Request $request
     * 
     * @return array
     */
    public function count(Request $request)
    {
        $groupBy = $request->get('groupBy');

        $count = DB::table('opportunities')
            ->select($groupBy, DB::raw('count(*) as total'))
            ->where('user_id', \Auth::id())
            ->groupBy($groupBy)
            ->pluck('total', $groupBy);

        return $count;
    }
}
