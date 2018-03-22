<?php

namespace App;

use App\Contracts\HasActivitiesInterface;
use App\Contracts\HasCompaniesInterface;
use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasWorkflowsInterface;
use App\Contracts\SearchableInterface;
use App\ModelTraits\HasActivitiesTrait;
use App\ModelTraits\HasCompaniesTrait;
use App\ModelTraits\HasCustomFieldsTrait;
use App\ModelTraits\HasNotesTrait;
use App\ModelTraits\HasWorkflowsTrait;
use App\ModelTraits\SearchableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * App\Opportunity
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[]         $activities
 * @property-read \App\Company                                                     $company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read mixed                                                            $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[]             $notes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Contact[]          $contacts
 * @property-read \App\Stage                                                       $stage
 * @property-read \App\User                                                        $user
 * @mixin \Eloquent
 */
class Opportunity extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface
{
    use HasActivitiesTrait;
    use HasCompaniesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;
    use HasWorkflowsTrait;
    use SearchableTrait;

    protected $guarded = [
        'id',
        'user',
        'team',
        'companies',
        'contacts',
        'stage',
        'custom_fields',
        'notes',
        'activities',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'expected_close',
        'actual_close',
        'last_viewed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->user->team();
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'opportunity_contact')->withPivot(['primary', 'position']);
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}
