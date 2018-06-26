<?php

namespace App\Http\Requests;

use App\Company;
use App\Contact;
use App\Opportunity;
use App\Tag;
use App\Team;
use App\User;
use App\Status;
use App\Stage;
use Illuminate\Foundation\Http\FormRequest;

class StoreFieldRequest extends FormRequest
{
    use SaelosFormRequestTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'label' => 'required|string|max:255',
            'alias' => 'string|max:255',
            'model' => sprintf(
                'required|string|in:%s',
                implode(',', [
                    Contact::class,
                    Company::class,
                    Opportunity::class,
                    User::class,
                ])
            ),
            'group' => 'required|string|max:255',
            'type'  => sprintf(
                'required|string|in:%s',
                implode(',', [
                    'text',
                    'textarea',
                    'radio',
                    'checkbox',
                    'select',
                    'lookup',
                    'picklist',
                    'number',
                    'date',
                    'email',
                    'url',
                    'entity',
                ])
            ),
            'entity_class' => sprintf(
                'nullable|required_if:type,entity|in:%s',
                implode(',', [
                    Contact::class,
                    Company::class,
                    Opportunity::class,
                    User::class,
                    Tag::class,
                    Team::class,
                    Status::class,
                    Stage::class,
                ])
            ),
            'default'   => 'nullable|string|max:255',
            'values'    => 'required_if:type,picklist|required_if:type,select',
            'required'   => 'nullable|boolean',
            'protected'  => 'nullable|boolean',
            'hidden'     => 'sometimes|required|boolean',
            'searchable' => 'sometimes|required|boolean',
            'summary'    => 'sometimes|nullable',
            'ordering'   => 'sometimes|required|integer',
        ];
    }
}
