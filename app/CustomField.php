<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomField extends Model
{
    protected $casts = [
        'values' => 'array',
    ];
}
