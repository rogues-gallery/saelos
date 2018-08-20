<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Import extends Model
{
    protected $casts = [
        'field_mapping' => 'array',
        'errors' => 'array',
    ];

    protected $guarded = [
        'id',
    ];
}
