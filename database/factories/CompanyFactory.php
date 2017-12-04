<?php

use Faker\Generator as Faker;

$factory->define(App\Company::class, function (Faker $faker) {
    return [
        'published' => 1,
        'name' => $faker->company,
        'description' => $faker->paragraph,
        'address1' => $faker->streetAddress,
        'address2' => $faker->secondaryAddress,
        'city' => $faker->city,
        'state' => $faker->state,
        'zip' => $faker->postcode,
        'country' => $faker->country,
        'phone' => $faker->phoneNumber,
        'fax' => $faker->phoneNumber,
        'website' => $faker->url,
        'info' => $faker->paragraph
    ];
});
