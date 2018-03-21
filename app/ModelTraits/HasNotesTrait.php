<?php

namespace App\ModelTraits;

use App\Note;

trait HasNotesTrait
{
    public function notes()
    {
        return $this->morphMany(Note::class, 'entity')->orderBy('created_at', 'DESC');
    }
}