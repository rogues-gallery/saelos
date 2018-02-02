<?php

namespace App;

use App\Workflows\Actions\ActionInterface;
use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    const PROCESS_ON_NONE = 0;
    const PROCESS_ON_CREATE = 1;
    const PROCESS_ON_UPDATE = 2;
    const PROCESS_ON_ANY = 3;

    public function action()
    {
        return $this->hasOne(WorkflowAction::class);
    }

    /**
     * Process this workflow on the provided Model
     *
     * @param Model $model
     */
    public function process(Model $model)
    {
        $field = $this->getWorkflowField($model);

        if ($field && $model->isDirty($field)) {
            $newValue = $this->getWorkflowFieldValue($model);
            /** @var WorkflowAction $action */
            $action = $this->action()->get()->first();

            if ($this->check_value === $newValue) {
                $actionClass = $action->type;
                /** @var ActionInterface $actionInstance */
                $actionInstance = new $actionClass;

                $actionInstance->execute($model, $action->details);
            }
        }
    }

    /**
     * @param Model $model
     *
     * @return string
     */
    private function getWorkflowField(Model $model): string
    {
        if ($model->{$this->field_alias}) {
            return $this->field_alias;
        }

        return '';
    }

    private function getWorkflowFieldValue(Model $model): string
    {
        if ($model->{$this->field_alias}) {
            return $model->{$this->field_alias};
        }

        return '';
    }
}
