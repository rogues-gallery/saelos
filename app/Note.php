<?php

namespace App;

use App\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Note
 *
 * @mixin \Eloquent
 */
class Note extends Model
{
    use SoftDeletes;

    protected $guarded = [
        'id',
        'entity',
        'user',
        'document',
    ];

    public function entity()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function document()
    {
        return $this->hasOne(Document::class);
    }
}
