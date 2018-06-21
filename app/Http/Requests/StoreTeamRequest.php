<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
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
            'description' => 'string|nullable',
            'leader_id' => 'numeric|nullable|exists:users,id',
            'users.*.id' => 'sometimes|required|exists:users',
            'users.*.name' => 'sometimes|required|exists:users,name'
        ];
    }
}
