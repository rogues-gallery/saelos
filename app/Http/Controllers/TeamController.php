<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\TeamCollection;
use App\Http\Resources\Team as TeamResource;

class TeamController extends Controller
{
    public function index()
    {
        return new TeamCollection(Team::with(['users', 'deals'])->paginate());
    }

    public function show($id)
    {
        return new TeamResource(Team::with(['users', 'deals'])->find($id));
    }

    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);
        $data = $request->all();

        $team->update($data);

        return $team;
    }

    public function store(Request $request)
    {
        return Team::create($request->all());
    }

    public function destroy($id)
    {
        Team::findOrFail($id)->delete();

        return '';
    }
}
