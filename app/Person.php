<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;

    protected $guarded = [
        'id',
        'company',
        'deals',
        'user',
        'activities',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function deals()
    {
        return $this->belongsToMany(Deal::class, 'deal_person');
    }
}
