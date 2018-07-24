<?php

namespace App\Http\Requests;

use App\Company;
use App\Contact;
use App\Opportunity;
use App\Field;
use App\Tag;
use App\Team;
use App\User;
use App\Status;
use App\Stage;

trait SaelosFormRequestTrait
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Build out a validation rule for the given Field
     * 
     * @param Field $field
     * 
     * @return string
     */
    protected function buildRuleForField(Field $field)
    {
        $rule = 'sometimes|';

        if ($field->required) {
            $rule .= 'required|';
        } else {
            $rule .= 'nullable|';
        }

        switch ($field->type) {
            case 'text':
                $rule .= 'string|max:255|';
                break;
            case 'email':
                $rule .= 'email|max:255|';
                break;
            case 'number':
                $rule .= 'numeric|';
                break;
            case 'picklist':
            case 'select':
                $rule .= sprintf('in:%s|', implode(',', array_keys(json_decode($field->values, true))));
                break;
            case 'phone':
                // @TODO
                break;
            case 'textarea':
                // @TODO
                break;
            case 'url':
                $rule .= 'url|max:255|';
                break;
            case 'date':
                $rule .= 'date|';
                break;
            case 'entity':
                $rule .= $this->buildEntityRuleForField($field);
            default:
                $rule .= '';
                break;
        }

        return rtrim($rule, '|');
    }

    /**
     * Build out an entity validation rule for the given field.
     * 
     * @TODO
     * 
     * @param Field $field
     * 
     * @return string
     */
    protected function buildEntityRuleForField(Field $field)
    {
        $rule = '';

        switch ($field->entity_class) {
            default:
                break;
        }

        return rtrim($rule, '|');
    }

    /**
     * Modify the rules array with custom_fields data
     * 
     * @param array $rules
     * 
     * @return array
     */
    protected function addCustomFieldRules(array $rules)
    {
        return array_merge($rules, [
            'custom_fields'                   => 'sometimes|array',
            'custom_fields.*.custom_field_id' => 'required|numeric',
            'custom_fields.*.value'           => 'string|nullable',
        ]);
    }
}
