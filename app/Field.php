<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CustomField
 *
 * @mixin \Eloquent
 */
class Field extends Model
{
	protected $table = 'fields';
	
    protected $casts = [
        'values' => 'array',
    ];

    protected $guarded = [
        'id',
    ];
}
