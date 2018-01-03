<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CustomField
 *
 * @mixin \Eloquent
 */
class CustomField extends Model
{
    protected $casts = [
        'values' => 'array',
    ];
}
