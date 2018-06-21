<?php

namespace App\Http\Requests;

use App\Company;
use App\Contact;
use App\Opportunity;
use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
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
            'note_name'    => 'required|string|max:255',
            'note_content' => 'required|string',
            'private'      => 'boolean|nullable',
        ];
    }
}
