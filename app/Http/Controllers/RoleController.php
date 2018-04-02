<?php

namespace App\Http\Controllers;

use App\Role;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\Role as RoleResource;
use Illuminate\Http\Request;


class RoleController extends Controller
{
    const INDEX_WITH = [
        'users',
    ];

    const SHOW_WITH = [
        'users',
    ];

    public function index()
    {
        return new RoleCollection(Role::with(static::INDEX_WITH)->paginate());
    }

    public function show($id)
    {
        return new RoleResource(Role::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        $team = Role::findOrFail($id);
        $data = $request->all();

        $team->update($data);

        return $team;
    }

    public function store(Request $request)
    {
        return Role::create($request->all());
    }

    public function destroy($id)
    {
        Role::findOrFail($id)->delete();

        return '';
    }
}
