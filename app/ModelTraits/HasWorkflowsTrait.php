<?php

namespace App\ModelTraits;

use App\Workflow;

trait HasWorkflowsTrait
{
    /**
     * Get a list of workflows that are processed at a given time.
     *
     * @param int $proccessAt
     *
     * @return array
     */
    public function workflows(int $proccessAt = Workflow::PROCESS_ON_NONE): array
    {
        $workflows = Workflow::where('entity_type', static::class);

        if ($proccessAt) {
            $workflows->where('process_at', $proccessAt);
        }

        return $workflows->get()->all();
    }
}