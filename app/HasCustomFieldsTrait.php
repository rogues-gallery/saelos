<?php

namespace App;

use Illuminate\Support\Facades\DB;

trait HasCustomFieldsTrait
{
    public function customFields()
    {
        return $this->morphMany(CustomFieldValue::class, 'model');
    }

    public function assignCustomFields($value)
    {
        if (!is_array($value)) {
            return;
        }

        foreach ($value as $field) {
            $customField = CustomField::where('alias', $field['alias'])
                ->where('model', get_class($this))
                ->first();

            // If we don't have a matching custom field, bail
            if (!$customField) {
                continue;
            }

            $customFieldValue = CustomFieldValue::where('model_id', $this->id)
                ->where('model_type', get_class($this))
                ->where('custom_field_id', $customField->id)
                ->first();

            if (!$customFieldValue) {
                $customFieldValue = new CustomFieldValue();
                $customFieldValue->customField()->associate($customField);
            }

            // If the value is empty, delete the entry and continue
            if (empty($field['value'])) {
                if ($customFieldValue->id) {
                    $customFieldValue->delete();
                }

                unset($customFieldValue);

                continue;
            }

            $customFieldValue->value = $field['value'];
            $customFieldValue->model()->associate($this);

            $customFieldValue->save();
        }
    }

    public function getCustomFieldsAttribute()
    {
        $customFields = CustomField::where('model', get_class($this))->get();
        $fieldValues = $this->customFields();
        $attribute = [];

        foreach ($customFields as $i => $field) {
            $array = [
                'type'  => $field->type,
                'label' => $field->label,
                'alias' => $field->alias,
                'value' => null,
            ];

            $thisField = clone $fieldValues;
            $filtered = $thisField->where('custom_field_id', $field->id);

            if ($value = $filtered->first()) {
                $array['value'] = $value->value;
            }

            if (is_array($field->values) && !empty($field->values)) {
                $array['options'] = $field->values;
            }

            $attribute[$field->alias] = $array;
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