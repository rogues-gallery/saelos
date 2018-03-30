<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $guarded = [
        'id',
        'contacts',
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
