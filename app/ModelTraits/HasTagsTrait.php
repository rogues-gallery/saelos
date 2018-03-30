<?php

namespace App\ModelTraits;

use App\Tag;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasTagsTrait
{
    public function tags():  MorphToMany
    {
        return $this->morphToMany(
            Tag::class,
            'entity',
            'tag_xref'
        );
    }
}