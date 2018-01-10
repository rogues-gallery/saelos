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

    public function data()
    {
        $model = $this->data_source;

        /** @var Builder $items */
        $items = $model::where('published', 1);

        $items->where(function($q) {
            foreach ($this->filters as $field => $details) {
                if (strpos($field, '.') !== false) {
                    list($relation, $col) = explode('.', $field);

                    // Special handling for custom fields
                    if ($relation === 'custom_fields') {
                        $q->whereIn('people.id', function ($builder) use ($col, $details) {
                            $builder->select('custom_field_values.model_id')
                                ->from('custom_field_values')
                                ->leftJoin('custom_fields', 'custom_field_values.custom_field_id', '=', 'custom_fields.id')
                                ->where('custom_field_values.model_type', '=', $this->data_source)
                                ->where('custom_field_values.model_id', '=', \DB::raw('`people`.`id`'))
                                ->where('custom_field_values.value', '=', $details['filter'])
                                ->where('custom_fields.alias', '=', $col);
                        });

                        continue;
                    }
                }

                switch ($this->data_source) {
                    case 'App\\Person':
                        $field = 'people.'.$field;
                        break;
                }

                switch ($details['operator']) {
                    case 'like':
                        $q->where($field, 'like', '%'.$details['filter'].'%');
                        break;
                    case '!like':
                        $q->where($field, 'not like', '%'.$details['filter'].'%');
                        break;
                    case 'startsWith':
                        $q->where($field, 'like', $details['filter'].'%');
                        break;
                    case 'endsWith':
                        $q->where($field, 'like', '%'.$details['filter']);
                        break;
                    case 'empty':
                        $q->whereNull($field);
                        break;
                    case '!empty':
                        $q->whereNotNull($field);
                        break;
                    case 'between':
                        $q->whereBetween($field, $details['filter']);
                        break;
                    default:
                        $q->where($field, $details['operator'], $details['filter']);
                }
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
