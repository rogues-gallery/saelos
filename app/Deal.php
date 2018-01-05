<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Deal
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[] $activities
 * @property-read \App\Company $company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read mixed $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[] $notes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Person[] $people
 * @property-read \App\Stage $stage
 * @property-read \App\User $user
 * @mixin \Eloquent
 */
class Deal extends Model
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;

    protected $guarded = [
        'id',
        'user',
        'team',
        'company',
        'people',
        'stage',
        'custom_fields',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->user->team();
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function people()
    {
        return $this->belongsToMany(Person::class, 'deal_person');
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
