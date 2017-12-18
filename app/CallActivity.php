<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CallActivity extends Model
{
    protected $casts = [
        'details' => 'array',
    ];

    public function activity()
    {
        return $this->morphMany(Activity::class, 'details');
    }
}
