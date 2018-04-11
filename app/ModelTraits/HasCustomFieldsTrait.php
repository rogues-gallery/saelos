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

    public function setCustomFieldValue(string $alias, $value): void
    {
        $customField = Field::where('alias', $alias)->get()->first();

        if (!$customField) {
            throw new \InvalidArgumentException(
                sprintf('There is no field with an alias of %s. Create it then try again', $alias)
            );
        }

        $customFieldValue = CustomFieldValue::where('model_id', $this->id)
            ->where('model_type', get_class($this))
            ->where('custom_field_alias', $alias)
            ->first();

        if (!$customFieldValue) {
            $customFieldValue = new CustomFieldValue();
            $customFieldValue->field()->associate($customField);
        }

        $customFieldValue->custom_field_alias = $alias;
        $customFieldValue->value = $value;
        $customFieldValue->model()->associate($this);

        $customFieldValue->save();
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

            $this->setCustomFieldValue($customField->alias, $field['value']);
        }
    }
}