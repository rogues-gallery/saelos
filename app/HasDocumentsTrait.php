<?php

namespace App;

trait HasDocumentsTrait
{
    public function documents()
    {
        return $this->morphMany(Document::class, 'entity');
    }
}