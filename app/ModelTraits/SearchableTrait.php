<?php

namespace App\ModelTraits;

use App\Field;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait SearchableTrait
{
	public static function search(array $searchArray, Builder $builder): Builder
    {
        $searchableFields = Field::where('model', static::class)
            ->where('searchable', true)
            ->get();

		$builder->where('published', 1);

		if (!empty($searchArray['offsets'])) {
            $builder->where(function(Builder $q) use ($searchArray, $searchableFields) {
                foreach ($searchArray['offsets'] as $criteria) {
                    $field = $searchableFields->where('alias', $criteria['keyword'])->first();

                    if ($criteria['exact']) {
                        $operator = array_key_exists($criteria['keyword'], $searchArray['exclude']) ? '!=' : '=';
                    } else {
                        $operator = array_key_exists($criteria['keyword'], $searchArray['exclude']) ? 'NOT LIKE' : 'LIKE';
                    }

                    if (!$field) {
                        static::handleRelationalSearch($criteria, $operator, $q);
                        continue;
                    }

                    if (is_array($criteria['value'])) {
                        $q->where(function (Builder $sq) use ($operator, $criteria) {
                            foreach ($criteria['value'] as $val) {
                                if (strpos($operator, 'LIKE') !== false) {
                                    $val = '%'.$val.'%';
                                }

                                $sq->orWhere($criteria['keyword'], $operator, $val);
                            }
                        });
                    } else {
                        $val = strpos($operator, 'LIKE') !== false
                            ? '%'.$criteria['value'].'%'
                            : $criteria['value'];

                        switch($field->type) {
                            // @TODO add support for different field types
                            default:
                                $q->where($criteria['keyword'], $operator, $val);
                                break;
                        }
                    }
                }
            });
        }

        if (!empty($searchArray['text'])) {
            $builder->where(function(Builder $q) use ($searchArray) {
                switch (static::class) {
                    case 'App\\Contact':
                        $q->orWhere('first_name', 'like', '%'.$searchArray['text'].'%');
                        $q->orWhere('last_name', 'like', '%'.$searchArray['text'].'%');
                        $q->orWhere('email', 'like', '%'.$searchArray['text'].'%');
                        break;
                    default:
                        $q->orWhere('name', 'like', '%'.$searchArray['text'].'%');
                        break;
                }
            });
        }

        return $builder;
	}

	protected static function handleRelationalSearch($criteria, $operator, Builder $query)
    {
        if (!isset($criteria['keyword'])) {
            return;
        }

        $val = strpos($operator, 'LIKE') !== false ? '%'.$criteria['value'].'%' : $criteria['value'];

        switch ($criteria['keyword']) {
            case 'opportunity':
                $query->whereHas('opportunities', function (Builder $q) use ($criteria, $operator, $val) {
                    $q->where('name', $operator, $val);
                });
                break;
            case 'stage':
                $query->whereHas('stage', function (Builder $q) use ($criteria, $operator, $val) {
                    $q->where('name', $operator, $val);
                });
                break;
            case 'status':
                $query->whereHas('status', function (Builder $q) use ($criteria, $operator, $val) {
                    $q->where('name', $operator, $val);
                });
                break;
            case 'contact':
                $query->whereHas('contacts', function (Builder $q) use ($criteria, $operator, $val) {
                    $q->where('first_name', $operator, $val);
                });
                break;
            case 'company':
                $query->whereHas('companies', function (Builder $q) use ($criteria, $operator, $val) {
                    $q->where('name', $operator, $val);
                });
                break;
        }
    }
}