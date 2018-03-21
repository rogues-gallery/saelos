<?php

namespace App\ModelTraits;

use App\Document;

trait HasDocumentsTrait
{
    public function documents()
    {
        return $this->morphMany(Document::class, 'entity');
    }
}