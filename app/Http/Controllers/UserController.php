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
    private $indexWith = [
        'team',
        'deals',
        'customFields',
    ];

    private $showWith = [
        'team',
        'deals',
        'customFields',
    ];

    public function index()
    {
        return new UserCollection(User::with($this->indexWith)->paginate());
    }

    /**
     * @param $id
     *
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(User::with($this->showWith)->find($id));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @TODO: Move company update to Model mutators
     *
     * @return User
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

        Auth::user()->notify(new UserUpdated($user));

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
