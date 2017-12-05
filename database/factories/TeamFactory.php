<?php

use Faker\Generator as Faker;

$factory->define(App\Team::class, function (Faker $faker) {
    return [
        'title' => $faker->company,
        'description' => $faker->paragraph,
    ];
});
