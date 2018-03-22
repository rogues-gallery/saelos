<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface SearchableInterface
{
	public static function search(array $searchArray, Builder $builder): Builder;
}