<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;

    protected $guarded = [
        'id',
        'deals',
        'people',
        'user',
        'custom_fields',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }
}
