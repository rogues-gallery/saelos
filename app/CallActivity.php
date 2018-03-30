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
    protected $touches = [
        'activity'
    ];

    protected $casts = [
        'details' => 'array',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'start_date',
        'end_date',
    ];

    protected $guarded = [
        'id'
    ];

    public function activity()
    {
        return $this->morphMany(Activity::class, 'details');
    }
}
