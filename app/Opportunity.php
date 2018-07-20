<?php

namespace App;

use App\Contracts\HasActivitiesInterface;
use App\Contracts\HasCompaniesInterface;
use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasTagsInterface;
use App\Contracts\SearchableInterface;
use App\ModelTraits\HasActivitiesTrait;
use App\ModelTraits\HasCompaniesTrait;
use App\ModelTraits\HasCustomFieldsTrait;
use App\ModelTraits\HasNotesTrait;
use App\ModelTraits\HasTagsTrait;
use App\ModelTraits\SearchableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

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
class Opportunity extends Model implements HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface, HasTagsInterface
{
    use SoftDeletes;
    use HasActivitiesTrait;
    use HasCompaniesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;
    use HasTagsTrait;
    use SearchableTrait;

    const ADDITIONAL_CSV_HEADERS = [
        'Stage',
        'Company',
        'Assignee',
    ];

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
        'tags'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'expected_close',
        'actual_close',
        'last_viewed',
        'deleted_at',
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

    public function toCsvRow($fields): array
    {
        $row = [];
        $aliases = $fields->pluck('alias')->all();

        foreach ($aliases as $column) {
            $field = $fields->where('alias', $column)->first();

            if (!$field->protected) {
                $row[$column] = $this->customFields->where('custom_field_alias', $column)->first()['value'];
            } else {
                $row[$column] = $this->{$column};
            }
        }

        $stage = $this->stage()->first();

        $row['stage'] = $stage ? $stage->name : "";

        $company = $this->companies()->wherePivot('primary', 1)->first();

        if (empty($company)) {
            $company = $this->companies()->first();
        }

        $row['primary_company'] = $company ? $company->name : "";

        $assignee = $this->user()->first();

        $row['assignee'] = $assignee ? $assignee->name : "";

        return $row;
    }
}
