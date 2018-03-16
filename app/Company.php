<?php

namespace App;

use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasWorkflowsInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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
class Company extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface
{
    use HasDocumentsTrait;
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
        'deals',
        'people',
        'user',
        'custom_fields',
        'notes',
        'documents',
        'activities',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function people()
    {
        return $this->morphedByMany(Person::class, 'entity', 'company_entities');
    }

    public function deals()
    {
        return $this->morphedByMany(Deal::class, 'entity', 'company_entities');
    }
}
