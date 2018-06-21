<?php

namespace App\Http\Requests;

use App\Opportunity;
use App\Field;
use Illuminate\Foundation\Http\FormRequest;

class StoreOpportunityRequest extends FormRequest
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

        foreach (Field::where(['model' => Opportunity::class])->get() as $field) {
            // Custom fields shouldn't be added to top level validation.
            if ($field->protected) {
                $rules[$field->alias] = $this->buildRuleForField($field);
            }
        }

        $rules = $this->addCustomFieldRules($rules);

        return $rules;
    }
}
