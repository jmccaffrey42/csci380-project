<?php

use Faker\Generator as Faker;
use App\User;

$factory->define(User::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
        'name' => $faker->name
    ];
});
