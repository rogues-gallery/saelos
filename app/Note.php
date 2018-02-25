<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Note
 *
 * @mixin \Eloquent
 */
class Note extends Model
{
    use HasDocumentsTrait;

    protected $guarded = [
        'id',
        'entity',
        'user',
    ];

    public function entity()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
