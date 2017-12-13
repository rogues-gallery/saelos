<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivityDetails extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
