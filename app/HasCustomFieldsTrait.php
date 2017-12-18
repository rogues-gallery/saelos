<?php

namespace App;

use Illuminate\Support\Facades\DB;

trait HasCustomFieldsTrait
{
    public function customFields()
    {
        return $this->morphMany(CustomFieldValue::class, 'model');
    }

    public function getCustomFieldsAttribute()
    {
        $customFields = CustomField::where('model', '=', get_class($this))->get();
        $fieldValues = $this->customFields()->get();
        $attribute = [];

        foreach ($customFields as $i => $field) {
            $array = [
                'alias' => $field->alias,
                'value' => null,
            ];

            $filtered = $fieldValues->where('custom_field_id', $field->id);

            if ($value = $filtered->first()) {
                $array['value'] = $value->value;
            }

            if (is_array($field->values) && !empty($field->values)) {
                $array['options'] = $field->values;
            }

            $attribute[] = $array;
        }

        return $attribute;
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['custom_fields'] = $this->getCustomFieldsAttribute();

        return $array;
    }
}