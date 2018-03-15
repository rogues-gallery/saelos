<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Activity extends Resource
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

        $array['company'] = $array['company'][0] ?? null;
        $array['deal'] = $array['deal'][0] ?? null;
        $array['person'] = $array['person'][0] ?? null;

        return $array;
    }
}
