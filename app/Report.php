<?php

namespace App;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\PersonController;
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

    /**
     * @TODO: Move this into a repository method
     *
     * @return Builder
     */
    public function data()
    {
        $model = $this->data_source;

        /** @var Builder $items */
        $items = $model::where('published', 1);
        $customInId = null;
        $customInRaw = null;

        switch ($this->data_source) {
            case 'App\\Person':
                $items->with(PersonController::INDEX_WITH);
                $customInId = 'people.id';
                $customInRaw = '`people`.`id`';
                break;
            case 'App\\Deal':
                $items->with(DealController::INDEX_WITH);
                $customInId = 'deals.id';
                $customInRaw = '`deals`.`id`';
                break;
            case 'App\\Companies':
                $items->with(CompanyController::INDEX_WITH);
                $customInId = 'companies.id';
                $customInRaw = '`companies`.`id`';
                break;
        }

        $items->where(function($q) use ($customInId, $customInRaw) {
            foreach ($this->filters as $field => $details) {
                if (strpos($field, '.') !== false) {
                    list($relation, $col) = explode('.', $field);

                    // Special handling for custom fields
                    if ($relation === 'custom_fields') {
                        $q->whereIn($customInId, function ($builder) use ($col, $details, $customInRaw) {
                            $builder->select('custom_field_values.model_id')
                                ->from('custom_field_values')
                                ->leftJoin('custom_fields', 'custom_field_values.custom_field_id', '=', 'custom_fields.id')
                                ->where('custom_field_values.model_type', '=', $this->data_source)
                                ->where('custom_field_values.model_id', '=', \DB::raw($customInRaw))
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
                    case 'App\\Deal':
                        $field = 'deals.'.$field;
                        break;
                    case 'App\\Company':
                        $field = 'companies.'.$field;
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

        return $items;
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['data'] = $this->data()->paginate();

        return $array;
    }
}
