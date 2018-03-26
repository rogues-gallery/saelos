<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'title',
        'published',
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
