<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\SmsActivity
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activity
 * @mixin \Eloquent
 */
class SmsActivity extends Model
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
    ];

    protected $guarded = [
        'id'
    ];

    public function activity()
    {
        return $this->morphMany(Activity::class, 'details');
    }
}
