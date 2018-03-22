<?php

namespace App\ModelTraits;

use App\Field;
use Illuminate\Database\Eloquent\Builder;

trait SearchableTrait
{
	public static function search(array $searchArray, Builder $builder): Builder
    {
        $searchableFields = Field::where('model', static::class)
            ->where('searchable', true)
            ->get();

		$builder->where('published', 1);
        $builder->where(function(Builder $q) use ($searchArray, $searchableFields) {
            foreach ($searchArray['offsets'] as $criteria) {
                $field = $searchableFields->where('alias', $criteria['keyword'])->first();

                if ($criteria['exact']) {
                    $operator = array_key_exists($criteria['keyword'], $searchArray['exclude']) ? '!=' : '=';
                } else {
                    $operator = array_key_exists($criteria['keyword'], $searchArray['exclude']) ? 'NOT LIKE' : 'LIKE';
                }

                if (is_array($criteria['value'])) {
                    $q->where(function (Builder $sq) use ($field, $operator, $criteria) {
                        foreach ($criteria['value'] as $val) {
                            if (strpos($operator, 'LIKE') !== false) {
                                $val = '%'.$val.'%';
                            }

                            $sq->orWhere($criteria['keyword'], $operator, $val);
                        }
                    });
                } else {
                    if (strpos($operator, 'LIKE') !== false) {
                        $criteria['value'] = '%'.$criteria['value'].'%';
                    }

                    switch($field->type) {
                        // @TODO add support for different field types
                        default:
                            $q->where($criteria['keyword'], $operator, $criteria['value']);
                            break;
                    }
                }
            }
        });

        return $builder;
	}
}