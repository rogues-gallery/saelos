<?php

namespace App\Contracts;

use App\Workflow;

interface HasWorkflowsInterface
{
    /**
     * Get a list of workflows that are processed at a given time.
     *
     * @param int $processAt
     *
     * @return array
     */
    public function workflows(int $processAt = Workflow::PROCESS_ON_NONE): array;
}