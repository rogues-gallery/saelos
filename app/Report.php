<?php

namespace App;

use App\Contracts\SearchableInterface;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\ContactController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Report extends Model implements SearchableInterface
{
    protected $casts = [
        'columns' => 'array',
        'filters' => 'array',
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
            case 'App\\Contact':
                $items->with(ContactController::INDEX_WITH);
                $customInId = 'contacts.id';
                $customInRaw = '`contacts`.`id`';
                break;
            case 'App\\Opportunity':
                $items->with(OpportunityController::INDEX_WITH);
                $customInId = 'opportunities.id';
                $customInRaw = '`opportunities`.`id`';
                break;
            case 'App\\Companies':
                $items->with(CompanyController::INDEX_WITH);
                $customInId = 'companies.id';
                $customInRaw = '`companies`.`id`';
                break;
        }

        $items->where(function(Builder $q) use ($customInId, $customInRaw) {
            foreach ($this->filters as $field => $details) {
                if (strpos($field, '.') !== false) {
                    list($relation, $col) = explode('.', $field);

                    // Special handling for custom fields
                    if ($relation === 'custom_fields') {
                        $q->whereIn($customInId, function ($builder) use ($col, $details, $customInRaw) {
                            $builder->select('custom_field_values.model_id')
                                ->from('custom_field_values')
                                ->leftJoin('fields', 'custom_field_values.custom_field_id', '=', 'fields.id')
                                ->where('custom_field_values.model_type', '=', $this->data_source)
                                ->where('custom_field_values.model_id', '=', \DB::raw($customInRaw))
                                ->where('custom_field_values.value', '=', $details['filter'])
                                ->where('fields.alias', '=', $col);
                        });

                        continue;
                    }
                }

                switch ($this->data_source) {
                    case 'App\\Contact':
                        $field = 'contacts.'.$field;
                        break;
                    case 'App\\Opportunity':
                        $field = 'opportunities.'.$field;
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
                    case 'in':
                        $q->whereIn($field, $details['filter']);
                        break;
                    case '!in':
                        $q->whereNotIn($field, $details['filter']);
                        break;
                    default:
                        $q->where($field, $details['operator'], $details['filter']);
                }
            }
        });

        return $items;
    }
}
