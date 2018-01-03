<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CallActivity
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activity
 * @mixin \Eloquent
 */
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
