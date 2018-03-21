<?php

use Faker\Generator as Faker;

$factory->define(App\Opportunity::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'summary' => $faker->paragraph,
        'amount' => $faker->numberBetween(1000, 50000),
        'probability' => $faker->numberBetween(0, 100),
        'expected_close' => $faker->dateTime('+1 year'),
        'actual_close' => $faker->dateTime('+1 year'),
        'last_viewed' => $faker->dateTime(),
    ];
});
