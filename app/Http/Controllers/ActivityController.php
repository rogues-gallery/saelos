<?php

namespace App\Http\Controllers;

use App\Activity;
use App\Http\Resources\Activity as ActivityResource;
use App\Http\Resources\ActivityCollection;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    const INDEX_WITH = [
        'details',
        'user',
    ];

    const SHOW_WITH = [
        'details',
        'user',
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
        $stage = Activity::findOrFail($id);
        $data = $request->all();

        $stage->update($data);

        return $stage;
    }

    public function store(Request $request)
    {
        return Activity::create($request->all());
    }

    public function destroy($id)
    {
        Activity::findOrFail($id)->delete();

        return '';
    }
}
