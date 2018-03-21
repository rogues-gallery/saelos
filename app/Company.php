<?php

namespace App;

use App\Contracts\HasActivitiesInterface;
use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasWorkflowsInterface;
use App\Contracts\SearchableInterface;
use App\ModelTraits\HasActivitiesTrait;
use App\ModelTraits\HasCustomFieldsTrait;
use App\ModelTraits\HasNotesTrait;
use App\ModelTraits\HasWorkflowsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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
class Company extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface
{
    use HasActivitiesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;
    use HasWorkflowsTrait;

    public static function search(string $searchString, Builder $builder): Builder
    {
        $searchArray = static::parseSearchString($searchString);

        $builder->where('published', 1);
        $builder->where(function(Builder $q) use ($searchArray) {
            if ($name = $searchArray['name']) {
                $q->orWhere('name', 'like', '%'.$name.'%');
            }

            if ($city = $searchArray['city']) {
                $q->orWhere('city', 'like', '%'.$city.'%');
            }

            if ($state = $searchArray['state']) {
                $q->orWhere('state', 'like', '%'.$state.'%');
            }
        });

        if ($modifiedSince = $searchArray['modified_since']) {
            $builder->where('updated_at', '>=', $modifiedSince);
        }

        return $builder;
    }

    public static function parseSearchString(string $searchString): array
    {
        return [
            'name' => $searchString,
            'city' => $searchString,
            'state' => $searchString,
            'modified_since' => null
        ];
    }

    protected $guarded = [
        'id',
        'opportunities',
        'contacts',
        'user',
        'custom_fields',
        'notes',
        'activities',
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
}
