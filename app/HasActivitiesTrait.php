<?php

namespace App;

trait HasActivitiesTrait
{
    public function activities()
    {
        return $this->morphMany(Activity::class, 'entity');
    }

    public function activityScore()
    {
        $activities = $this->activities()->get();
        $completed = [];

        foreach ($activities as $activity) {
            if ($activity->complete) {
                $completed[] = $activity;
            }
        }

        return count($completed)/count($activities);
    }

    public function assignDefaultActivities()
    {

    }
}