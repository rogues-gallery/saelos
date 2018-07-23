<?php

namespace App;

use App\Contracts\CsvExportable;
use App\Contracts\HasActivitiesInterface;
use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasTagsInterface;
use App\Contracts\SearchableInterface;
use App\ModelTraits\HasActivitiesTrait;
use App\ModelTraits\HasCustomFieldsTrait;
use App\ModelTraits\HasNotesTrait;
use App\ModelTraits\HasTagsTrait;
use App\ModelTraits\SearchableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Company
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Activity[]         $activities
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\CustomFieldValue[] $customFields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Opportunity[]      $opportunities
 * @property-read mixed                                                            $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Note[]             $notes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Contact[]          $contacts
 * @property-read \App\User                                                        $user
 * @mixin \Eloquent
 */
class Company extends Model implements HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasTagsInterface, CsvExportable
{
    use SoftDeletes;
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;
    use HasTagsTrait;
    use SearchableTrait;

    const ADDITIONAL_CSV_HEADERS = [
        'Assignee'
    ];

    protected $guarded = [
        'id',
        'opportunities',
        'contacts',
        'user',
        'custom_fields',
        'notes',
        'activities',
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

    public function contacts()
    {
        return $this->morphedByMany(Contact::class, 'entity', 'company_xref')
            ->where('published', 1);
    }

    public function opportunities()
    {
        return $this->morphedByMany(Opportunity::class, 'entity', 'company_xref')
            ->where('published', 1);
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

        $assignee = $this->user()->first();

        $row['assignee'] = $assignee ? $assignee->name : "";

        return $row;
    }
}
