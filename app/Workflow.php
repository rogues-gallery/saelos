<?php

namespace App;

use App\Contracts\HasCustomFieldsInterface;
use App\Workflows\Actions\ActionInterface;
use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    const PROCESS_ON_DELETE = -1;
    const PROCESS_ON_NONE = 0;
    const PROCESS_ON_CREATE = 1;
    const PROCESS_ON_UPDATE = 2;
    const PROCESS_ON_ANY = 3;
    const PROCESS_ON_CUSTOM_DELETE = -101;
    const PROCESS_ON_CUSTOM_NONE = 100;
    const PROCESS_ON_CUSTOM_CREATE = 101;
    const PROCESS_ON_CUSTOM_UPDATE = 102;
    const PROCESS_ON_CUSTOM_ANY = 103;

    public $processingCustom = false;
    public $customField;

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
        if ($this->fieldIsDirty($model)) {
            $newValue = $this->getWorkflowFieldValue($model);
            /** @var WorkflowAction $action */
            $action = $this->action()->get()->first();

            if ($this->check_value === $newValue) {
                $actionClass = $action->type;
                /** @var ActionInterface $actionInstance */
                $actionInstance = new $actionClass;

                $details = $actionInstance->execute($model, $action->details);
                $actionInstance->updateActionDetails($action, $details);
            }
        }
    }

    /**
     * If it's a custom field, assume it's dirty for now.
     * Otherwise check model attributes to determine.
     *
     * @param Model $model
     *
     * @return bool
     */
    public function fieldIsDirty(Model $model): bool
    {
        if ($this->isCustomField($model)) {
            return $this->processingCustom;
        }

        return $model->isDirty($this->field_alias);
    }

    /**
     * @param Model $model
     *
     * @return bool
     */
    private function isCustomField(Model $model): bool
    {
        // Check main model attributes
        $attributes = $model->attributesToArray();

        return ! array_key_exists($this->field_alias, $attributes);
    }

    /**
     * @param Model  $model
     *
     * @return string
     */
    private function getWorkflowFieldValue(Model $model): ?string
    {
        // Check main model attributes
        $attributes = $model->attributesToArray();

        if (array_key_exists($this->field_alias, $attributes)) {
            return $model->getAttribute($this->field_alias);
        }

        if ($model instanceof HasCustomFieldsInterface) {
            $this->customField->load('customField');

            if ($this->field_alias === $this->customField->customField->alias) {
                return $this->customField->value;
            }
        }

        return '';
    }
}
