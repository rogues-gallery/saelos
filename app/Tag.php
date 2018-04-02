<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'color'
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
