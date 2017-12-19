<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomFieldValue extends Model
{
    public function customField()
    {
        return $this->belongsTo(CustomField::class);
    }

    public function model()
    {
        return $this->morphTo();
    }
}
