<?php

namespace App\Http\Controllers;

use App\Activity;
use App\CallActivity;
use App\Mail\Contact as ContactMail;
use App\SmsActivity;
use App\User;
use Auth;
use App\Company;
use App\Opportunity;
use App\Http\Resources\ContactCollection;
use App\Contact;
use Illuminate\Http\Request;
use App\Http\Resources\Contact as ContactResource;
use Illuminate\Support\Facades\Mail;
use Twilio\Rest\Client;
use Twilio\Twiml;

class ContactController extends Controller
{
    const INDEX_WITH = [
        'user',
        'companies',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.notes',
        'opportunities.notes.user',
        'activities',
        'activities.details',
        'activities.user',
        'activities.contact',
        'activities.company',
        'activities.opportunity',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
        'status',
        'tags',
    ];

    const SHOW_WITH = [
        'user',
        'companies',
        'opportunities',
        'opportunities.companies',
        'opportunities.contacts',
        'opportunities.notes',
        'opportunities.notes.user',
        'activities',
        'activities.details',
        'activities.user',
        'activities.contact',
        'activities.company',
        'activities.opportunity',
        'customFields',
        'customFields.field',
        'notes',
        'notes.document',
        'notes.user',
        'status',
        'tags',
    ];

    public function index(Request $request)
    {
        $contacts = Contact::with(static::INDEX_WITH);

        if ($searchParams = json_decode($request->get('searchParams'), true)) {
            $contacts = Contact::search($searchParams, $contacts);
        }

        $contacts->orderBy('contacts.id', 'desc');

        return new ContactCollection($contacts->paginate());
    }

    public function show($id)
    {
        return new ContactResource(Contact::with(static::SHOW_WITH)->find($id));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @TODO: Move company update to Model mutators
     *
     * @return Contact
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        /** @var Contact $contact */
        $contact = Contact::findOrFail($id);
        $data = $request->all();
        $companies = $data['companies'] ?? [];
        $opportunities = $data['opportunities'] ?? [];
        $contactUser = $data['user'] ?? null;
        $customFields = $data['custom_fields'] ?? [];

        foreach ($companies as $contactCompany) {
            $company = Company::findOrFail($contactCompany['id']);

            if ($contact->companies()->get()->contains('id', $company->id)) {
                $contact->companies()->updateExistingPivot($company->id, [
                    'primary' => $contactCompany['pivot']['primary'] ?? 0,
                    'position' => $contactCompany['pivot']['position'] ?? ''
                ]);
            } else {
                $contact->companies()->save($company, [
                    'primary' => $contactCompany['pivot']['primary'] ?? 0,
                    'position' => $contactCompany['pivot']['position'] ?? ''
                ]);
            }
        }

        foreach ($opportunities as $contactOpp) {
            $opportunity = Opportunity::findOrFail($contactOpp['id']);

            if ($contact->opportunities()->get()->contains('id', $opportunity->id)) {
                $contact->opportunities()->updateExistingPivot($opportunity->id, [
                    'primary' => $contactOpp['pivot']['primary'] ?? 0,
                    'position' => $contactOpp['pivot']['position'] ?? ''
                ]);
            } else {
                $contact->opportunities()->save($opportunity, [
                    'primary' => $contactOpp['pivot']['primary'] ?? 0,
                    'position' => $contactOpp['pivot']['position'] ?? ''
                ]);
            }
        }



        $user = $contactUser ? User::find($contactUser) : Auth::user();

        if (isset($data['user_id']) && is_string($data['user_id']) && !is_numeric($data['user_id'])) {
            $user = User::where('name', $data['user_id'])->first();
            unset($data['user_id']);
        }

        $contact->user()->associate($user);
        $contact->update($data);
        $contact->assignCustomFields($customFields);

        return $this->show($contact->id);
    }

    /**
     * @param Request $request
     *
     * @return Contact
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $data = $request->all();

        if (isset($data['email'])) {
            $contact = Contact::where('email', '=', $data['email'])->first();
        }

        if (!isset($contact)) {
            unset($data['user_id']);
            $contact = Contact::create($data);
        }

        return $this->update($request, $contact->id);
    }

    /**
     * @param $id
     *
     * @return string
     * @throws \Exception
     */
    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return '';
    }

    public function email(Request $request, int $id)
    {
        $contact = Contact::findOrFail($id);
        $email = new ContactMail($request->get('email_content'), $request->get('email_subject'));

        Mail::to($contact->email)
            ->send($email);

        return 1;
    }

    public function sms(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $user = Auth::user();
        $user->load(['customFields']);
        $twilioNumberField = $user->customFields()->where('custom_field_alias', 'twilio_number')->first();

        if ($twilioNumberField === null) {
            return response(['success' => false, 'message' => 'User does not have a valid Twilio phone number.']);
        }

        try {
            $client = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));

            $message = $client->messages->create(
                $contact->phone,
                [
                    'from' => $twilioNumberField->value,
                    'body' => $request->get('message')
                ]
            );

        } catch (\Exception $e) {
            return response(['success' => false, 'message' => $e->getMessage()]);
        }

        $details = SmsActivity::create([
            'uuid' => $message->sid,
            'details' => [],
            'start_date' => new \DateTime,
            'message' => $request->get('message')
        ]);

        $activity = Activity::create([
            'name' => 'SMS Sent',
            'description' => sprintf('%s sent an SMS to %s %s', $user->name, $contact->first_name, $contact->last_name),
            'user_id' => $user->id,
            'details_id' => $details->id,
            'details_type' => SmsActivity::class,
            'completed' => 1
        ]);

        $activity->contact()->attach($contact);

        if ($opportunityId = $request->get('opportunity_id')) {
            $opportunity = Opportunity::find($opportunityId);

            if ($opportunity) {
                $activity->opportunity()->attach($opportunity);
            }
        }

        if ($companyId = $request->get('company_id')) {
            $company = Company::find($companyId);

            if ($company) {
                $activity->company()->attach($company);
            }
        }

        $activity->load(['company', 'contact', 'opportunity', 'details']);

        return response(['success' => true, 'message' => 'SMS Sent', 'activity' => $activity]);
    }

    public function call(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $user = Auth::user();
        $user->load(['customFields']);
        $twilioNumberField = $user->customFields()->where('custom_field_alias', 'twilio_number')->first();

        if ($twilioNumberField === null) {
            return response(['success' => false, 'message' => 'User does not have a valid Twilio phone number.']);
        }

        try {
            $client = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));

            $call = $client->calls->create(
                $user->phone,
                $twilioNumberField->value,
                [
                    'url' => route('api.contacts.outbound', ['id' => $contact->id, 'user_id' => $user->id])
                ]
            );

        } catch (\Exception $e) {
            return response(['success' => false, 'message' => $e->getMessage()]);
        }

        $details = CallActivity::create([
            'uuid' => $call->sid,
            'details' => [],
            'start_date' => new \DateTime,
        ]);

        $activity = Activity::create([
            'name' => 'Phone call placed',
            'description' => sprintf('%s placed a phone call to %s %s', $user->name, $contact->first_name, $contact->last_name),
            'user_id' => $user->id,
            'details_id' => $details->id,
            'details_type' => CallActivity::class
        ]);

        $activity->contact()->attach($contact);

        if ($opportunityId = $request->get('opportunity_id')) {
            $opportunity = Opportunity::find($opportunityId);

            if ($opportunity) {
                $activity->opportunity()->attach($opportunity);
            }
        }

        if ($companyId = $request->get('company_id')) {
            $company = Company::find($companyId);

            if ($company) {
                $activity->company()->attach($company);
            }
        }

        $activity->load(['company', 'contact', 'opportunity', 'details']);

        return response(['success' => true, 'message' => 'Call initiated', 'activity' => $activity]);
    }

    public function outbound(Request $request, $id, $userId)
    {
        $contact = Contact::findOrFail($id);
        $user = User::findOrFail($userId);

        // @TODO: Validate contact phone number

        $twiml = new Twiml();
        $twiml->dial($contact->phone, [
            'record' => 'record-from-answer-dual',
            'recordingStatusCallback' => route('api.contacts.outbound.recording', ['id' => $contact->id])
        ]);

        return response($twiml, 200, [
            'Content-Type' => 'text/xml'
        ]);
    }

    public function recording(Request $request, $id)
    {
        $activity = CallActivity::where('uuid', $request->get('CallSid'))->first();

        $activity->update([
            'recording' => $request->get('RecordingUrl')
        ]);

        $activity->activity()->update([
            'completed' => 1
        ]);
    }

    public function count(Request $request)
    {
        $groupBy = $request->get('groupBy');
        $user = \Auth::user();

        $count = \DB::table('contacts')
                    ->select($groupBy, \DB::raw('count(*) as total'))
                    ->where('user_id', $user->id)
                    ->groupBy($groupBy)
                    ->pluck('total', $groupBy);

        return response(['success' => true, 'data' => $count]);
    }
}
