<?php

namespace App;

use App\Contracts\HasCustomFieldsInterface;
use App\Contracts\HasWorkflowsInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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
class Deal extends Model implements HasWorkflowsInterface, HasCustomFieldsInterface, SearchableInterface, HasActivitiesInterface, HasCompaniesInterface
{
    use HasDocumentsTrait;
    use HasActivitiesTrait;
    use HasCompaniesTrait;
    use HasCustomFieldsTrait;
    use HasNotesTrait;
    use HasWorkflowsTrait;

    protected $hidden = [
        'pivot',
    ];

    protected $guarded = [
        'id',
        'user',
        'team',
        'companies',
        'people',
        'stage',
        'custom_fields',
        'notes',
        'documents',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'expected_close',
        'actual_close',
        'last_viewed',
    ];

    public static function search(string $searchString, Builder $builder): Builder
    {
        $searchArray = static::parseSearchString($searchString);

        $builder->where('published', 1);
        $builder->where(function(Builder $q) use ($searchArray) {
            if ($name = $searchArray['name']) {
                $q->orWhere('name', 'like', '%'.$name.'%');
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
            'modified_since' => null
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->user->team();
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
