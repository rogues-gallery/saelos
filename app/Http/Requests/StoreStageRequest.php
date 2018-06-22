<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStageRequest extends FormRequest
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
            'probability' => 'integer|between:0,100',
            'active' => 'sometimes|boolean',
            'color' => [ // using an array here because of regex
                'sometimes',
                'regex:/^#(\d|[a-f]){6}$/i',
            ]
        ];
    }
}
