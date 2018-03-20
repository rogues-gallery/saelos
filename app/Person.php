<?php

namespace App;

use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasWorkflowsInterface;
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
class Person extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface
{
    use HasDocumentsTrait;
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasCompaniesTrait;
    use HasNotesTrait;
    use HasWorkflowsTrait;
    use SearchableTrait;

    protected $guarded = [
        'id',
        'companies',
        'deals',
        'user',
        'activities',
        'custom_fields',
        'notes',
        'documents',
        'activities',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deals()
    {
        return $this->belongsToMany(Deal::class, 'deal_person')->withPivot(['primary', 'position']);
    }
}
