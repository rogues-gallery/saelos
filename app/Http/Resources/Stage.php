<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Stage extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $array = parent::toArray($request);

        if ($request->route()->getName() === 'api.stage_pipeline') {
            $user_id = $request->get('user_id');


            $array['count'] = $this->resource->opportunities()->count();
            $array['count_for_team'] = $this->resource->teamOpportunities($user_id)->count();
            $array['count_for_user'] = $this->resource->userOpportunities($user_id)->count();
        }

        return $array;
    }
}
