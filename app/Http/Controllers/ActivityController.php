<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Company;
use App\FieldUpdateActivity;
use App\Opportunity;
use App\Contact;
use App\Http\Resources\Activity as ActivityResource;
use App\Http\Resources\ActivityCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    const INDEX_WITH = [
        'details',
        'user',
        'company',
        'opportunity',
        'opportunity.stage',
        'contact',
        'contact.companies',
        'contact.status',
        'tags'
    ];

    const SHOW_WITH = [
        'details',
        'user',
        'company',
        'opportunity',
        'opportunity.stage',
        'contact',
        'contact.companies',
        'contact.status',
        'tags'
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
        $completed = $data['completed'] ?? false;

        if ($contact) {
            $activity->contact()->save(Contact::find($contact), [], $completed && !$activity->completed);
        }

        if ($company) {
            $activity->company()->save(Company::find($company), [], $completed && !$activity->completed);
        }

        if ($opportunity) {
            $activity->opportunity()->save(Opportunity::find($opportunity), [], $completed && !$activity->completed);
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

    public function graph(Request $request)
    {
        $timeframe = $request->get('timeframe');

        switch ($timeframe) {
            case 'monthly':
                $groupByExtra = 'monthday';
                $select = 'count(*) as count, user_id, DAY(created_at) as monthday';
                $timeSpan = [
                    (new Carbon())->startOfMonth(),
                    (new Carbon())->endOfMonth()
                ];
                break;
            case 'weekly':
            default:
                $groupByExtra = 'weekday';
                $select = 'count(*) as count, user_id, DAYNAME(created_at) as weekday';
                $timeSpan = [
                    (new Carbon())->startOfWeek(),
                    new Carbon()
                ];
                break;
        }

        $results = \DB::table('activities')
            ->select(\DB::raw($select))
            ->where('details_type', '!=', FieldUpdateActivity::class)
            ->whereNotNull('user_id')
            ->whereBetween('created_at', $timeSpan)
            ->groupBy([
                'user_id',
                $groupByExtra
            ])
            ->get();

        return response($results);
    }
}
