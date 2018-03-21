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

/**
 * App\Contact
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[]         $activities
 * @property-read \App\Company                                                     $company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Opportunity[]      $opportunities
 * @property-read mixed                                                            $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[]             $notes
 * @property-read \App\User                                                        $user
 * @mixin \Eloquent
 */
class Contact extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasCompaniesTrait;
    use HasNotesTrait;
    use HasWorkflowsTrait;
    use SearchableTrait;

    protected $guarded = [
        'id',
        'companies',
        'opportunities',
        'user',
        'activities',
        'custom_fields',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function opportunities()
    {
        return $this->belongsToMany(Opportunity::class, 'opportunity_contact')->withPivot(['primary', 'position']);
    }
}
