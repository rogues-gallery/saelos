<?php

namespace App\Http\Controllers;

use App\Mail\Contact as ContactMail;
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
        $email = new ContactMail($request->get('emailContent'), $request->get('emailSubject'));

        Mail::to($contact->email)
            ->send($email);

        return 1;
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

            $client->calls->create(
                $user->phone,
                $twilioNumberField->value,
                [
                    'url' => route('api.contacts.outbound', ['id' => $contact->id, 'user_id' => $user->id])
                ]
            );

        } catch (\Exception $e) {
            return response(['success' => false, 'message' => $e->getMessage()]);
        }

        return response(['success' => true, 'message' => 'Call initiated']);
    }

    public function outbound(Request $request, $id, $userId)
    {
        $contact = Contact::findOrFail($id);
        $user = User::findOrFail($userId);

        // @TODO: Validate contact phone number
        // @TODO: Create call activity for this user & contact

        $twiml = new Twiml();
        $twiml->dial($contact->phone);

        return response($twiml, 200, [
            'Content-Type' => 'text/xml'
        ]);
    }
}
