<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CustomFieldValue
 *
 * @property-read \App\CustomField $customField
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $model
 * @mixin \Eloquent
 */
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
