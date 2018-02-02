<?php

namespace App\Observers;

use App\Contracts\HasWorkflowsInterface;
use App\Workflow;
use App\Person;

class ApplyWorkflowObserver
{
    public function creating(HasWorkflowsInterface $model)
    {
        $workflows = $model->workflows(Workflow::PROCESS_ON_CREATE);

        /** @var Workflow $workflow */
        foreach ($workflows as $workflow) {
            $workflow->process($model);
        }
    }

    public function updating(HasWorkflowsInterface $model)
    {
        $workflows = $model->workflows(Workflow::PROCESS_ON_UPDATE);

        /** @var Workflow $workflow */
        foreach ($workflows as $workflow) {
            $workflow->process($model);
        }
    }

    public function saving(HasWorkflowsInterface $model)
    {
        $workflows = $model->workflows(Workflow::PROCESS_ON_ANY);

        /** @var Workflow $workflow */
        foreach ($workflows as $workflow) {
            $workflow->process($model);
        }
    }
}