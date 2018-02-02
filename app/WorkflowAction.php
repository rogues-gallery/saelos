<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkflowAction extends Model
{
    protected $casts = [
        'details' => 'array',
    ];

    public function workflow()
    {
        return $this->belongsTo(Workflow::class);
    }
}
