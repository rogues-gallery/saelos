<?php

namespace App\Observers;

use App\Activity;
use App\CustomFieldValue;
use App\FieldUpdateActivity;
use Illuminate\Database\Eloquent\Model;

class ModelUpdateObserver
{
    public function updating(Model $model)
    {
        if ($model instanceof CustomFieldValue) {
            $this->handleCustomFieldUpdating($model);
            return;
        }

        if ($model->isDirty()) {
            foreach ($model->getDirty() as $fieldAlias => $value) {
                if (in_array($fieldAlias, ['updated_at', 'created_at', 'deleted_at'])) {
                    return;
                }

                $fieldUpdate = new FieldUpdateActivity([
                    'field_alias' => $fieldAlias,
                    'old_value' => $model->getOriginal($fieldAlias),
                    'new_value' => $value
                ]);

                $fieldUpdate->save();

                Activity::create([
                    'entity_id' => $model->id,
                    'entity_type' => get_class($model),
                    'title' => 'Field updated',
                    'description' => '',
                    'completed' => 1,
                    'user_id' => \Auth::user() ? \Auth::user()->id : null,
                    'details_id' => $fieldUpdate->id,
                    'details_type' => FieldUpdateActivity::class
                ]);
            }
        }
    }

    private function handleCustomFieldUpdating($model)
    {
        if ($model->isDirty()) {
            $fieldUpdate = new FieldUpdateActivity([
                'field_alias' => $model->custom_field_alias,
                'old_value' => $model->getOriginal('value'),
                'new_value' => $model->value
            ]);

            $fieldUpdate->save();

            Activity::create([
                'entity_id' => $model->model_id,
                'entity_type' => $model->model_type,
                'title' => 'Field updated',
                'description' => '',
                'completed' => 1,
                'user_id' => \Auth::user() ? \Auth::user()->id : null,
                'details_id' => $fieldUpdate->id,
                'details_type' => FieldUpdateActivity::class
            ]);
        }
    }
}