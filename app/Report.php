<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Report extends Model
{
    protected $casts = [
        'columns' => 'array',
        'filters' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function data($start = 0, $limit = 30)
    {
        $model = $this->data_source;

        /** @var Builder $items */
        $items = $model::where('published', 1);

        $items->where(function(Builder $q) {
            foreach ($this->filters as $filter => $value) {
                $q->where($filter, 'like', '%'.$value.'%');
            }
        });

        return $items->paginate();
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['data'] = $this->data();

        return $array;
    }
}
