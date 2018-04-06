<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\TeamCollection;
use App\Http\Resources\Team as TeamResource;

class TeamController extends Controller
{
    const INDEX_WITH = [
        'users',
        'opportunities',
        'users.customFields',
    ];

    const SHOW_WITH = [
        'users',
        'users.opportunities',
        'users.customFields',
    ];

    public function index()
    {
        return new TeamCollection(Team::with(static::INDEX_WITH)->paginate());
    }

    public function show($id)
    {
        return new TeamResource(Team::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Team $team */
        $team = Team::findOrFail($id);
        $data = $request->all();
        $users = $data['users'] ?? [];

        $team->syncUsers($users);

        $team->update($data);

        return $this->show($team->id);
    }

    public function store(Request $request)
    {
        $team = Team::create($request->all());

        return $this->update($request, $team->id);
    }

    public function destroy($id)
    {
        Team::findOrFail($id)->delete();

        return '';
    }
}
