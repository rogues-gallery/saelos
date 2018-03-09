<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;

trait SearchableTrait
{
	public static function search(string $searchString, Builder $builder): Builder
	{
		$searchArray = static::parseSearchString($searchString);

		$builder->where('published', 1);
        $builder->where(function(Builder $q) use ($searchArray) {
            if ($firstName = $searchArray['first_name']) {
                $q->orWhere('first_name', 'like', '%'.$firstName.'%');
            }

            if ($lastName = $searchArray['last_name']) {
                $q->orWhere('last_name', 'like', '%'.$lastName.'%');
            }

            if ($email = $searchArray['email']) {
                $q->orWhere('email', 'like', '%'.$email.'%');
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
			'first_name' => $searchString,
			'last_name' => $searchString,
			'email' => $searchString,
			'modified_since' => null
		];
	}
}