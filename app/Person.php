<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Person
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activities
 * @property-read \App\Company $company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Deal[] $deals
 * @property-read mixed $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[] $notes
 * @property-read \App\User $user
 * @mixin \Eloquent
 */
class Person extends Model
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;

    protected $guarded = [
        'id',
        'company',
        'deals',
        'user',
        'activities',
        'custom_fields',
        'notes',
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
