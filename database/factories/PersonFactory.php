<?php

use Faker\Generator as Faker;

$factory->define(App\Contact::class, function (Faker $faker) {
    return [
        'published' => 1,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'position' => $faker->jobTitle,
        'email' => $faker->email,
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
