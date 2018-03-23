<?php

namespace App;

use App\Contracts\SearchableInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Activity
 *
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $details
 * @property-read \App\User $user
 * @mixin \Eloquent
 */
class Activity extends Model implements SearchableInterface
{
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'details_type',
        'details_id',
        'user_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'due_date',
        'fulfillment_date',
    ];

    protected $guarded = [
        'id',
        'activities',
    ];

    public static function search(array $searchArray, Builder $builder): Builder
    {
        return $builder;
    }

    public function opportunity()
    {
        return $this->morphedByMany(Opportunity::class, 'entity', 'activity_xref');
    }

    public function contact()
    {
        return $this->morphedByMany(Contact::class, 'entity', 'activity_xref');
    }

    public function company()
    {
        return $this->morphedByMany(Company::class, 'entity', 'activity_xref');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->morphTo();
    }
}
