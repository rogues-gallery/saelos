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
     * @param Role $role
     * 
     * @return RoleResource
     */
    public function show(Role $role)
    {
        return new RoleResource($role->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Role
     * 
     * @param Request $request
     * @param Role    $role
     * 
     * @return RoleResource
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        return $this->show($role);
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

        return $this->show($role);
    }

    /**
     * Delete a Role
     * 
     * @param Role $role
     * 
     * @return string
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return '';
    }
}
