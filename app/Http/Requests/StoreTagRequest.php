<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTagRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'color' => [
                'sometimes',
                'regex:/^#(\d|[a-f]){6}$/i'
            ],
            'activity_id' => 'somtimes|exists:activities,id',
            'activities.*.id' => 'sometimes|required|integer|exists:activities,id',
            'contact_id' => 'sometimes|exists:contacts,id',
            'contacts.*.id' => 'sometimes|required|integer|exists:contacts,id',
            'company_id' => 'sometimes|exists:companies,id',
            'companies.*.id' => 'sometimes|required|integer|exists:companies,id',
            'opportunity_id' => 'sometimes|exists:opportunities,id',
            'opportunities.*.id' => 'sometimes|required|integer|exists:opportunities,id',
        ];
    }
}
