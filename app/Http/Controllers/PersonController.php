<?php

namespace App\Http\Controllers;

use App\Company;
use App\CustomField;
use App\CustomFieldValue;
use App\Events\ContactUpdated;
use App\Http\Resources\PersonCollection;
use App\Person;
use App\Stage;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\Person as PersonResource;

class PersonController extends Controller
{
    private $indexWith = [
        'user',
        'company',
        'deals',
        'activities',
        'activities.details',
        'customFields',
    ];

    private $showWith = [
        'user',
        'company',
        'deals',
        'activities',
        'activities.details',
        'customFields',
    ];

    public function index()
    {
        return new PersonCollection(Person::with($this->indexWith)->paginate());
    }

    public function show($id)
    {
        return new PersonResource(Person::with($this->showWith)->find($id));
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @TODO: Move user, company, and custom field association update to Model mutators
     *
     * @return Person
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        /** @var Person $person */
        $person = Person::findOrFail($id);
        $data = $request->all();
        $personCompany = $data['company'] ?? [];
        $personUser = $data['user'] ?? [];
        $personCustomFields = $data['custom_fields'] ?? [];

        if ($personCompany) {
            $company = Company::findOrFail($personCompany['id']);
            $company->update($personCompany);

            $person->company()->associate($company);
        }

        if ($personUser) {
            $user = User::findOrFail($personUser['id']);
            $user->update($personUser);

            $person->user()->associate($user);
        }

        if ($personCustomFields) {
            foreach ($personCustomFields as $field) {
                $customField = CustomField::where('alias', $field['alias'])->first();

                // If we don't have a matching custom field, bail
                if (!$customField) {
                    continue;
                }

                $customFieldValue = CustomFieldValue::where('model_id', $person->id)
                    ->where('model_type', Person::class)
                    ->where('custom_field_id', $customField->id)
                    ->first();

                if (!$customFieldValue) {
                    $customFieldValue = new CustomFieldValue();
                    $customFieldValue->customField()->associate($customField);
                }

                // If the value is empty, delete the entry and continue
                if (empty($field['value'])) {
                    if ($customFieldValue->id) {
                        $customFieldValue->delete();
                    }

                    unset($customFieldValue);

                    continue;
                }

                $customFieldValue->value = $field['value'];
                $customFieldValue->model()->associate($person);

                $customFieldValue->save();
            }
        }

        $person->update($data);

        ContactUpdated::broadcast($person);

        return $this->show($person->id);
    }

    /**
     * @param Request $request
     *
     * @return Person
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $person = Person::create($request->all());

        return $this->update($request, $person->id);
    }

    /**
     * @param $id
     *
     * @return string
     */
    public function destroy($id)
    {
        Person::findOrFail($id)->delete();

        return '';
    }
}
