<?php

namespace App\Http\Requests;

use App\CallActivity;
use App\EmailActivity;
use App\SmsActivity;
use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'date',
            'fulfillment_date' => 'sometimes|date',
            'completed' => 'sometimes|boolean',
            'company_id' => 'sometimes|nullable|integer|exists:companies,id',
            'contact_id' => 'sometimes|nullable|integer|exists:contacts,id',
            'opportunity_id' => 'sometimes|nullable|integer|exists:opportunities,id',
            'user_id' => 'required|integer|exists:users,id',
            'details_type' => sprintf(
                'required|in:%s',
                implode(',', [
                    CallActivity::class,
                    EmailActivity::class,
                    SmsActivity::class,
                ])
            )
        ];
    }
}
