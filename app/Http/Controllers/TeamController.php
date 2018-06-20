<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\TeamCollection;
use App\Http\Resources\Team as TeamResource;

/**
 * @resource Teams
 * 
 * Interact with Teams
 */
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

    /**
     * Fetching Teams
     * 
     * @return TeamCollection
     */
    public function index()
    {
        return new TeamCollection(Team::with(static::INDEX_WITH)->paginate());
    }

    /**
     * Fetch a single Team
     * 
     * @param int $id
     * 
     * @return TeamResource
     */
    public function show($id)
    {
        return new TeamResource(Team::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Team
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return TeamResource
     */
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

    /**
     * Save a new Team
     * 
     * @param Request $request
     * 
     * @return TeamResource
     */
    public function store(Request $request)
    {
        $team = Team::create($request->all());

        return $this->update($request, $team->id);
    }

    /**
     * Delete a Team
     * 
     * @param int $id
     * 
     * @return string
     */
    public function destroy($id)
    {
        Team::findOrFail($id)->delete();

        return '';
    }
}
