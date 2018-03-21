<?php

namespace App\Http\Controllers;

use App\Notifications\UserUpdated;
use Auth;
use App\User;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    const INDEX_WITH = [
        'team',
        'opportunities',
        'customFields',
    ];

    const SHOW_WITH = [
        'team',
        'opportunities',
        'customFields',
    ];

    public function index()
    {
        return new UserCollection(User::with(static::INDEX_WITH)->paginate());
    }

    /**
     * @param $id
     *
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(User::with(static::SHOW_WITH)->find($id));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @TODO: Move company update to Model mutators
     *
     * @return UserResource
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        /** @var User $user */
        $user = User::findOrFail($id);
        $data = $request->all();
        $customFields = $data['custom_fields'] ?? [];

        $user->update($data);
        $user->assignCustomFields($customFields);

        return $this->show($user->id);
    }

    /**
     * @param Request $request
     *
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    public function store(Request $request)
    {
        return User::create($request->all());
    }

    /**
     * @param $id
     *
     * @return string
     * @throws \Exception
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return '';
    }
}
