<?php

namespace App;

use App\Contracts\CsvExportable;
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
use Illuminate\Database\Eloquent\SoftDeletes;

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
class Contact extends Model implements HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface, HasTagsInterface, CsvExportable
{
    use SoftDeletes;
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasCompaniesTrait;
    use HasNotesTrait;
    use HasTagsTrait;
    use SearchableTrait;

    const ADDITIONAL_CSV_HEADERS = [
        'Status',
        'Company',
        'Assignee',
    ];

    protected $guarded = [
        'id',
        'companies',
        'opportunities',
        'user',
        'activities',
        'custom_fields',
        'notes',
        'status',
        'tags'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function opportunities()
    {
        return $this->belongsToMany(Opportunity::class, 'opportunity_contact')->withPivot(['primary', 'position']);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
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

        $status = $this->status()->first();

        $row['status'] = $status ? $status->name : "";

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
