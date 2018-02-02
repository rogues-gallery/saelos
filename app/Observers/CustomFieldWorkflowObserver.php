<?php

namespace App\Observers;

use App\Contracts\HasWorkflowsInterface;
use App\CustomFieldValue;
use App\Workflow;

class CustomFieldWorkflowObserver
{
    public function creating(CustomFieldValue $customFieldValue)
    {
        $modelType = $customFieldValue->model_type;
        $model = $modelType::find($customFieldValue->model_id);

        if ($model instanceof HasWorkflowsInterface) {
            $workflows = $model->workflows(Workflow::PROCESS_ON_CREATE);

            /** @var Workflow $workflow */
            foreach ($workflows as $workflow) {
                if ($customFieldValue->isDirty('value')) {
                    $workflow->processingCustom = true;
                    $workflow->customField = $customFieldValue;
                    $workflow->process($model);
                }
            }

            $model->save();
        }
    }

    public function updating(CustomFieldValue $customFieldValue)
    {
        $modelType = $customFieldValue->model_type;
        $model = $modelType::find($customFieldValue->model_id);

        if ($model instanceof HasWorkflowsInterface) {
            $workflows = $model->workflows(Workflow::PROCESS_ON_UPDATE);

            /** @var Workflow $workflow */
            foreach ($workflows as $workflow) {
                if ($customFieldValue->isDirty('value')) {
                    $workflow->processingCustom = true;
                    $workflow->customField = $customFieldValue;
                    $workflow->process($model);
                }
            }

            $model->save();
        }
    }

    public function saving(CustomFieldValue $customFieldValue)
    {
        $modelType = $customFieldValue->model_type;
        $model = $modelType::find($customFieldValue->model_id);

        if ($model instanceof HasWorkflowsInterface) {
            $workflows = $model->workflows(Workflow::PROCESS_ON_ANY);

            /** @var Workflow $workflow */
            foreach ($workflows as $workflow) {
                if ($customFieldValue->isDirty('value')) {
                    $workflow->processingCustom = true;
                    $workflow->customField = $customFieldValue;
                    $workflow->process($model);
                }
            }

            $model->save();
        }
    }
}