<?php

namespace App\Http\Controllers;

use Auth;
use App\Company;
use App\Opportunity;
use App\Contact;
use App\Http\Resources\CompanyCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Company as CompanyResource;

class CompanyController extends Controller
{
    const INDEX_WITH = [
        'user',
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.customFields',
        'opportunities.customFields.field',
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
        'contacts',
        'contacts.companies',
        'contacts.opportunities',
        'contacts.opportunities.contacts',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.customFields',
        'opportunities.customFields.field',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
        'tags',
    ];

    public function index(Request $request)
    {
        $companies = Company::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $companies = Company::search($searchParams, $companies);
        }

        $companies->orderBy('id', 'desc');

        return new CompanyCollection($companies->paginate());
    }

    public function show($id)
    {
        return new CompanyResource(Company::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        if ($request->input('action') == 'restore'
          && Company::onlyTrashed()->where('id', $id)->restore()) {
              $company = Company::findOrFail($id);
              return $this->show($company->id);
        }

        /** @var Company $company */
        $company = Company::findOrFail($id);
        $data = $request->all();
        $customFields = $data['custom_fields'] ?? [];
        $contacts = $data['contacts'] ?? [];
        $opportunities = $data['opportunities'] ?? [];

        foreach ($opportunities as $i => $companyOpp) {
            $opportunity = Opportunity::findOrFail($companyOpp['id']);

            if ($company->opportunities()->get()->contains('id', $opportunity->id)) {
                $company->opportunities()->updateExistingPivot($company->id, [
                    'primary' => $i === 0
                ]);
            } else {
                $company->opportunities()->save($opportunity, [
                    'primary' => $i === 0
                ]);
            }
        }

        if ($contacts) {
            $toSync = [];

            foreach ($contacts as $i => $companyContact) {
                $contact = Contact::findOrFail($companyContact['id']);

                $toSync[$contact->id] = ['primary' => $i === 0];
            }

            $company->contacts()->sync($toSync);
        }

        $company->user()->associate(Auth::user());
        $company->update($data);
        $company->assignCustomFields($customFields);

        return $this->show($company->id);
    }

    public function store(Request $request)
    {
        $company = Company::create($request->all());

        return $this->update($request, $company->id);
    }

    public function destroy($id)
    {
        Company::findOrFail($id)->delete();

        return '';
    }
}
