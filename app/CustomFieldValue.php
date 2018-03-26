<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CustomFieldValue
 *
 * @property-read \App\Field                                    $customField
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $model
 * @mixin \Eloquent
 */
class CustomFieldValue extends Model
{
    public function field()
    {
        return $this->belongsTo(Field::class, 'custom_field_id');
    }

    public function model()
    {
        return $this->morphTo();
    }
}
