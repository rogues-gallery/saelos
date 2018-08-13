<?php

namespace App\Observers;

use Auth;
use App\Activity;
use App\CustomFieldValue;
use App\FieldUpdateActivity;
use App\HasActivitiesInterface;
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
                if (in_array($fieldAlias, ['updated_at', 'created_at', 'deleted_at', 'activities'])) {
                    return;
                }

                $fieldUpdate = new FieldUpdateActivity([
                    'field_alias' => $fieldAlias,
                    'old_value' => $model->getOriginal($fieldAlias),
                    'new_value' => $value
                ]);

                $fieldUpdate->save();

                $user = Auth::check() ? Auth::user() : $model->user;

                if ($fieldAlias === 'user_id') {
                    $newAssignee = \DB::table('users')->select('name')->where('id', $fieldUpdate->new_value)->first();
                    $oldAssignee = \DB::table('users')->select('name')->where('id', $fieldUpdate->old_value)->first();
                    $name = sprintf('Assigned to %s', $newAssignee ? $newAssignee->name : null);
                    $description = sprintf('%s changed the assignee to %s <span class="text-muted">(from %s)</span>', $user->name, $newAssignee ? $newAssignee->name : null, $oldAssignee ? $oldAssignee->name : null);
                } elseif ($fieldAlias === 'status_id') {
                    $newStatus = \DB::table('statuses')->select('name')->where('id', $fieldUpdate->new_value)->first();
                    $oldStatus = \DB::table('statuses')->select('name')->where('id', $fieldUpdate->old_value)->first();
                    $name = sprintf('Status changed to %s', $newStatus ? $newStatus->name : null);
                    $description = sprintf('%s changed the status to %s <span class="text-muted">(from %s)</span>', $user->name, $newStatus ? $newStatus->name : null, $oldStatus ? $oldStatus->name : null);
                } elseif ($fieldAlias === 'stage_id') {
                    $newStage = \DB::table('stages')->select('name')->where('id', $fieldUpdate->new_value)->first();
                    $oldStage = \DB::table('stages')->select('name')->where('id', $fieldUpdate->old_value)->first();
                    $name = sprintf('Stage changed to %s', $newStage ? $newStage->name : null);
                    $description = sprintf('%s changed the stage to %s <span class="text-muted">(from %s)</span>', $user->name, $newStage ? $newStage->name : null, $oldStage ? $oldStage->name : null);
                } else {
                    $fieldName = \DB::table('fields')
                        ->select('label')
                        ->from('fields')
                        ->where([
                            'alias' => $fieldAlias,
                            'model' => get_class($model)
                        ])
                        ->first()->label;
                    $name = sprintf('%s updated', $fieldName);
                    $description = sprintf('%s updated %s from %s to %s',
                     $user->name,
                      $fieldName,
                       $fieldUpdate->old_value,
                        $fieldUpdate->new_value);
                }

                $activity = Activity::create([
                    'name' => $name,
                    'description' => $description,
                    'completed' => 1,
                    'user_id' => $user->id,
                    'details_id' => $fieldUpdate->id,
                    'details_type' => FieldUpdateActivity::class
                ]);

                $model->activities()->save($activity, ['primary' => true]);
            }
        }
    }

    private function handleCustomFieldUpdating(CustomFieldValue $model)
    {
        if ($model->isDirty()) {
            $fieldUpdate = new FieldUpdateActivity([
                'field_alias' => $model->custom_field_alias,
                'old_value' => $model->getOriginal('value'),
                'new_value' => $model->value
            ]);

            $fieldUpdate->save();

            $fieldName = \DB::table('fields')
                ->select('label')
                ->from('fields')
                ->where('id', $model->custom_field_id)
                ->first()->label;

            $user = \Auth::user();

            $activity = Activity::create([
                'name' => sprintf('%s updated', $fieldName),
                'description' => sprintf('%s updated %s to %s', $user->name, $fieldUpdate->old_value, $fieldUpdate->new_value),
                'completed' => 1,
                'user_id' => $user->id,
                'details_id' => $fieldUpdate->id,
                'details_type' => FieldUpdateActivity::class
            ]);

            $entityModel = $model->model()->first();

            if ($entityModel instanceof HasActivitiesInterface) {
                $entityModel->activities()->save($activity, ['primary' => true]);
            }
        }
    }
}