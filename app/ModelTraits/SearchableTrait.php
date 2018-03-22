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
                $operator = array_key_exists($criteria['keyword'], $searchArray['exclude']) ? '!=' : '=';

                if (is_array($criteria['value'])) {
                    $q->where(function (Builder $sq) use ($field, $operator, $criteria) {
                        foreach ($criteria->value as $val) {
                            $sq->orWhere($criteria['keyword'], $operator, $val);
                        }
                    });
                } else {
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