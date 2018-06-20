<?php

namespace App\Http\Controllers;

use App\Role;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\Role as RoleResource;
use Illuminate\Http\Request;

/**
 * @resource Roles
 * 
 * Interact with Roles
 */
class RoleController extends Controller
{
    const INDEX_WITH = [
        'users',
    ];

    const SHOW_WITH = [
        'users',
    ];

    /**
     * Fetching Roles
     * 
     * @return RoleCollection
     */
    public function index()
    {
        return new RoleCollection(Role::with(static::INDEX_WITH)->paginate());
    }

    /**
     * Fetch a single Role
     * 
     * @param int $id
     * 
     * @return RoleResource
     */
    public function show($id)
    {
        return new RoleResource(Role::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Role
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return RoleResource
     */
    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $data = $request->all();

        $role->update($data);

        return $this->show($role->id);
    }

    /**
     * Save a new Role
     * 
     * @param Request $request
     * 
     * @return RoleResource
     */
    public function store(Request $request)
    {
        $role = Role::create($request->all());

        return $this->show($role->id);
    }

    /**
     * Delete a Role
     * 
     * @param int $id
     * 
     * @return string
     */
    public function destroy($id)
    {
        Role::findOrFail($id)->delete();

        return '';
    }
}
