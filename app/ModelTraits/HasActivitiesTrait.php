<?php

namespace App\ModelTraits;

use App\Activity;
use App\EmailActivity;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;

trait HasActivitiesTrait
{
    public function activities():  MorphToMany
    {
        return $this->morphToMany(
            Activity::class,
            'entity',
            'activity_xref'
        )
            ->withPivot(['primary'])->orderBy('created_at', 'DESC');
    }

    /**
     * @param array $activities
     * 
     * @return void
     */
    public function addActivities(array $activities): void
    {
        Collection::make($activities)->filter(function($activity) {
            return !isset($activity['id']);
        })->each(function ($activity) {
            $detailType = $activity['details_type'];

            if (class_exists($detailType)) {
                $details = new $detailType;
                
                $details->created_at = $activity['details']['created_at'];

                if ($details instanceof EmailActivity) {
                    $details->content = $activity['details']['content'];
                }

                $details->details = [];

                $details->save();

                $activity = Activity::create([
                    'details_type' => get_class($details),
                    'details_id' => $details->id,
                    'name' => $activity['name'],
                    'description' => $activity['description'],
                    'completed' => $activity['completed'],
                ]);
                
                $this->activities()->save($activity, ['primary' => true]);
            }
        });
    }
}