<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Notifications\UserUpdated;
use App\Role;
use Auth;
use App\User;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;
use Twilio\Twiml;
use App\Activity;
use App\CallActivity;
use App\SmsActivity;

class UserController extends Controller
{
    const INDEX_WITH = [
        'team',
        'opportunities',
        'customFields',
        'roles',
        'settings',
    ];

    const SHOW_WITH = [
        'team',
        'opportunities',
        'customFields',
        'roles',
        'settings',
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
        $settings = $data['settings'] ?? [];
        $roleId = $data['role_id'] ?? null;
        $roles = $data['roles'] ?? $user->roles()->get()->all();
        $password = $data['password'] ?? null;
        $secondPassword = $data['second_password'] ?? null;

        $roleIds = array_map(function($r) { return $r['id']; }, $roles);

        if ($roleId && !in_array($roleId, $roleIds)) {
            $roleIds[] = $roleId;
        }

        $user->roles()->sync($roleIds);
        $user->update($data);

        if ($password && $password === $secondPassword) {
            $user->password = \Hash::make($password);
            $user->save();
        }

        $settings = array_map(function ($setting) {
            return is_array($setting) ? json_encode($setting) : $setting;
        }, $settings);

        $user->setSettings($settings);
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

    public function inboundcall(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $twiml = new Twiml();

        if ($user === null) {
            $twiml->say("I'm sorry, but the number you have dialed has been disconnected.");

            return response($twiml, 200, [
                'Content-Type' => 'text/xml'
            ]);
        } else {
            $twiml->dial($user->phone, [
                'record' => 'record-from-answer-dual',
                'recordingStatusCallback' => route('api.users.inbound.recording', $user->id)
            ]);
        }

        $details = CallActivity::create([
            'uuid' => $request->get('CallSid'),
            'details' => ['direction' => 'inbound'],
            'start_date' => new \DateTime,
        ]);

        $activity = Activity::create([
            'name' => 'Inbound Call',
            'description' => sprintf('Contact made an inbound call to %s', $user->name),
            'user_id' => $user->id,
            'details_id' => $details->id,
            'details_type' => CallActivity::class
        ]);

        $contact = Contact::where('phone', $request->get('Caller'))->first();

        // @TODO: Determine contact info from request if unknown
        if ($contact) {
            $activity->contact()->attach($contact);
        }

        return response($twiml, 200, [
            'Content-Type' => 'text/xml'
        ]);
    }

    public function recording(Request $request, $id)
    {
        $activity = CallActivity::where('uuid', $request->get('CallSid'))->first();

        if ($activity) {
            $activity->update([
                'recording' => $request->get('RecordingUrl')
            ]);

            $activity->activity()->update([
                'completed' => 1
            ]);
        }
    }

    public function inboundsms(Request $request, $id)
    {
        $user = User::find($id);
        $contact = Contact::where('phone', $request->get('From'))->first();

        $details = SmsActivity::create([
            'uuid' => $request->get('SmsMessageSid'),
            'details' => ['direction' => 'inbound'],
            'start_date' => new \DateTime,
            'message' => $request->get('Body')
        ]);

        $activity = Activity::create([
            'name' => 'SMS Received',
            'description' => sprintf('Contact sent an sms to %s', $user->name),
            'user_id' => $user->id,
            'details_id' => $details->id,
            'details_type' => SmsActivity::class,
            'completed' => 1
        ]);


        // @TODO: Determine contact info from request if unknown
        if ($contact) {
            $activity->contact()->attach($contact);
        }

        return response();
    }
}
