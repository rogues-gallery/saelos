<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'color'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function opportunities()
    {
        return $this->morphedByMany(Opportunity::class, 'entity', 'tag_xref');
    }

    public function contacts()
    {
        return $this->morphedByMany(Contact::class, 'entity', 'tag_xref');
    }

    public function companies()
    {
        return $this->morphedByMany(Company::class, 'entity', 'tag_xref');
    }

    public function activities()
    {
        return $this->morphedByMany(Activity::class, 'entity', 'tag_xref');
    }
}
