<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\EmailActivity
 *
 * @mixin \Eloquent
 */
class EmailActivity extends Model
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
