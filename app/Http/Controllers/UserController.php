<?php

namespace App\Http\Controllers;

use App\Contact;
use App\EmailActivity;
use App\Exceptions\MissingSettingException;
use App\Notifications\UserUpdated;
use App\Role;
use Auth;
use App\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserCollection;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;
use Twilio\Rest\Client;
use Twilio\Twiml;
use App\Activity;
use App\CallActivity;
use App\SmsActivity;

/**
 * @resource Users
 * 
 * Interact with Users
 */
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

    /**
     * Fetching Users
     * 
     * @return UserCollection
     */
    public function index()
    {
        return new UserCollection(User::with(static::INDEX_WITH)->paginate(50));
    }

    /**
     * Fetch a single User
     * 
     * @param User $user
     * 
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user->load(static::SHOW_WITH));
    }

    /**
     * Update an existing User
     * 
     * @param StoreUserRequest $request
     * @param User             $user
     *
     * @TODO: Move company update to Model mutators
     *
     * @return UserResource
     */
    public function update(StoreUserRequest $request, User $user)
    {
        $data = $request->validated();
        $customFields = $data['custom_fields'] ?? [];
        $settings = $data['settings'] ?? [];
        $roleId = $data['role_id'] ?? null;
        $roles = $data['roles'] ?? $user->roles()->get()->all();
        $password = $data['password'] ?? null;
        $secondPassword = $data['second_password'] ?? null;

        $roleIds = array_map(function ($r) {
            return $r['id'];
        }, $roles);

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

        return $this->show($user);
    }

    /**
     * Save a new User
     * 
     * @param StoreUserRequest $request
     *
     * @return UserResource
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());

        return $this->update($request, $user);
    }

    /**
     * Delete a User
     * 
     * @param User $user
     *
     * @return string
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();

        return '';
    }

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param User    $user
     * 
     * @return Response
     */
    public function inboundcall(Request $request, User $user)
    {
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

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param int     $id
     */
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

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param User    $user
     * 
     * @return Response
     */
    public function inboundsms(Request $request, User $user)
    {
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

    /**
     * Get Quota Counts
     * 
     * @param Request $request
     *
     * @TODO: Need to calc team & responses
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function count(Request $request)
    {
        $user = \Auth::user();

        $timeFrame = $user->customFields()
            ->where('custom_field_alias', 'quota_is_for')
            ->first();

        $timeFrame = $timeFrame ? $timeFrame->value : 'weekly';

        $timeFunc = function (Builder $query) use ($timeFrame) {
            switch ($timeFrame) {
                case 'monthly':
                    $timeSpan = [
                        (new Carbon())->startOfMonth(),
                        (new Carbon())->endOfMonth()
                    ];
                    break;
                case 'quarterly':
                    $timeSpan = [
                        (new Carbon())->startOfQuarter(),
                        (new Carbon())->endOfQuarter()
                    ];
                    break;
                case 'weekly':
                default:
                    $timeSpan = [
                        (new Carbon())->startOfWeek(),
                        (new Carbon())->endOfWeek()
                    ];
                    break;
            }

            $query->whereBetween('created_at', $timeSpan);
        };

        $emailCount = \DB::table('activities')
            ->select(\DB::raw('count(*) as total'))
            ->where('details_type', EmailActivity::class)
            ->where('user_id', \Auth::user()->id)
            ->where($timeFunc)
            ->first()->total;

        $callCount = \DB::table('activities')
            ->select(\DB::raw('count(*) as total'))
            ->where('details_type', CallActivity::class)
            ->where('user_id', \Auth::user()->id)
            ->where($timeFunc)
            ->first()->total;

        $oppCount = \DB::table('opportunities')
            ->select(\DB::raw('count(*) as total'))
            ->where('user_id', \Auth::user()->id)
            ->where($timeFunc)
            ->first()->total;

        $count = [
            'volume' => array_sum([$emailCount, $callCount, 0, $oppCount, 0]),
            'email' => $emailCount,
            'calls' => $callCount,
            'team' => 0,
            'opportunities' => $oppCount,
            'responses' => 0
        ];

        return response(['success' => true, 'data' => $count]);
    }

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param User    $user
     */
    public function purchaseNumber(Request $request, User $user)
    {
        try {
            $client = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));
            $numbers = $client->availablePhoneNumbers(env('TWILIO_COUNTRY_CODE'))->local->read([
                'areaCode' => env('TWILIO_AREA_CODE'),
            ]);

            $number = $client->incomingPhoneNumbers->create([
                'friendlyName' => $user->name,
                'phoneNumber' => $numbers[0]->phoneNumber,
                'voiceUrl' => route('api.users.inbound', $user->id),
                'smsUrl' => route('api.users.sms.inbound', $user->id)
            ]);

            $user->setCustomFieldValue('twilio_number', $number->phoneNumber);

        } catch (\Exception $e) {
            return response(['success' => false, 'message' => $e->getMessage()]);
        }

        return response([
            'data' => [
                'number' => $number->phoneNumber
            ]
        ]);
    }

    /**
     * Get folder names for the IMAP connection
     */
    public function getEmailFolders()
    {
        try {
            return Auth::user()->getFolderNames()->all();
        } catch (MissingSettingException $e) {
            // noop
        }
        
        return [];
    }
}
