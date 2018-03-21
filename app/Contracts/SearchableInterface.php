<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface SearchableInterface
{
	public static function search(string $searchString, Builder $builder): Builder;

	public static function parseSearchString(string $searchString): array;
}