<?php

namespace App\ModelTraits;

use App\CustomFieldValue;
use App\Field;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasCustomFieldsTrait
{
    public function customFields(): MorphMany
    {
        return $this->morphMany(CustomFieldValue::class, 'model');
    }

    public function assignCustomFields($value)
    {
        if (!is_array($value)) {
            return;
        }

        foreach ($value as $field) {
            $customField = Field::find($field['custom_field_id']);

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
                $customFieldValue->field()->associate($customField);
            }

            // If the value is empty, delete the entry and continue
            if (empty($field['value'])) {
                if ($customFieldValue->id) {
                    $customFieldValue->delete();
                }

                unset($customFieldValue);

                continue;
            }

            $customFieldValue->custom_field_alias = $customField->alias;
            $customFieldValue->value = $field['value'];
            $customFieldValue->model()->associate($this);

            $customFieldValue->save();
        }
    }
}