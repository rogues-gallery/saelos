<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Field
 *
 * @mixin \Eloquent
 */
class Field extends Model
{
    use SoftDeletes;

    protected $table = 'fields';

    protected $casts = [
        'values' => 'array',
    ];

    protected $guarded = [
        'id',
        'is_custom',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function toArray()
    {
        $array = parent::toArray();

        $array['is_custom'] = !$array['protected'];

        return $array;
    }
}
