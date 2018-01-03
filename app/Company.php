<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Company
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activities
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Deal[] $deals
 * @property-read mixed $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[] $notes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Person[] $people
 * @property-read \App\User $user
 * @mixin \Eloquent
 */
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
