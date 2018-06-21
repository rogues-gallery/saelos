<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Requests\StoreTeamRequest;
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
     * @param Team $team
     * 
     * @return TeamResource
     */
    public function show(Team $team)
    {
        return new TeamResource($team->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Team
     * 
     * @param StoreTeamRequest $request
     * @param Team             $team
     * 
     * @return TeamResource
     */
    public function update(StoreTeamRequest $request, Team $team)
    {
        $data = $request->validated();
        $users = $data['users'] ?? [];

        $team->syncUsers($users);

        $team->update($data);

        return $this->show($team);
    }

    /**
     * Save a new Team
     * 
     * @param StoreTeamRequest $request
     * 
     * @return TeamResource
     */
    public function store(StoreTeamRequest $request)
    {
        $team = Team::create($request->validated());

        return $this->update($request, $team);
    }

    /**
     * Delete a Team
     * 
     * @param Team $team
     * 
     * @return string
     */
    public function destroy(Team $team)
    {
        $team->delete();

        return '';
    }
}
