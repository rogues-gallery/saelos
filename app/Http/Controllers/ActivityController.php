<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Company;
use App\Deal;
use App\Person;
use App\Http\Resources\Activity as ActivityResource;
use App\Http\Resources\ActivityCollection;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    const INDEX_WITH = [
        'details',
        'user',
        'company',
        'deal',
        'person',
        'person.companies'
    ];

    const SHOW_WITH = [
        'details',
        'user',
        'company',
        'deal',
        'person',
        'person.companies',
    ];

    public function index(Request $request)
    {
        $activities = Activity::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $activities = Activity::search($searchString, $activities);
        }

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
        $person = $data['person_id'] ?? null;
        $company = $data['company_id'] ?? null;
        $deal = $data['deal_id'] ?? null;

        if ($person) {
            $activity->people()->save(Person::find($person));
        }

        if ($company) {
            $activity->companies()->save(Company::find($company));
        }

        if ($deal) {
            $activity->deals()->save(Deal::find($deal));
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
