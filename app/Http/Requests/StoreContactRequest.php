<?php

namespace App\Http\Requests;

use App\Contact;
use App\Field;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    use SaelosFormRequestTrait;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [];

        foreach (Field::where(['model' => Contact::class])->get() as $field) {
            // Custom fields shouldn't be added to top level validation.
            if ($field->protected) {
                $rules[$field->alias] = $this->buildRuleForField($field);
            }
        }

        $rules = $this->addCustomFieldRules($rules);

        return $rules;
    }
}
