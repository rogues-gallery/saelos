<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Company;
use App\Opportunity;
use App\Contact;
use App\Http\Resources\Activity as ActivityResource;
use App\Http\Resources\ActivityCollection;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    const INDEX_WITH = [
        'details',
        'user',
        'company',
        'opportunity',
        'contact',
        'contact.companies'
    ];

    const SHOW_WITH = [
        'details',
        'user',
        'company',
        'opportunity',
        'contact',
        'contact.companies',
    ];

    public function index(Request $request)
    {
        $activities = Activity::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $activities = Activity::search($searchString, $activities);
        }

        $activities->where('user_id', \Auth::user()->id);
        $activities->orderBy('due_date', 'desc');

        return new ActivityCollection($activities->paginate());
    }

    public function show($id)
    {
        return new ActivityResource(Activity::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Activity $activity */
        $activity = Activity::findOrFail($id);
        $data = $request->all();
        $contact = $data['contact_id'] ?? null;
        $company = $data['company_id'] ?? null;
        $opportunity = $data['opportunity_id'] ?? null;

        if ($contact) {
            $activity->contacts()->save(Contact::find($contact));
        }

        if ($company) {
            $activity->company()->save(Company::find($company));
        }

        if ($opportunity) {
            $activity->opportunities()->save(Opportunity::find($opportunity));
        }

        $activity->update($data);


        return $this->show($activity->id);
    }

    /**
     * @param Request $request
     *
     * @return Activity
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $activity = Activity::create($request->all());

        return $this->update($request, $activity->id);
    }

    public function destroy($id)
    {
        Activity::findOrFail($id)->delete();

        return '';
    }
}
