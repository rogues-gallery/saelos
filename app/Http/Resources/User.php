<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\Resource;

class User extends Resource
{
    /**
     * @var \App\User
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $array = parent::toArray($request);

        if ($request->route()->getName() === 'api.active_user') {
            $array['total_contacts'] = $this->resource->contacts()->count();
            $array['total_contacts_last_week'] = $this->resource->contacts()
                ->where('created_at', '<', (new Carbon)->startOfWeek())
                ->count();
        }

        return $array;
    }
}
