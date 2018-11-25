<?php

use Faker\Generator as Faker;

$factory->define(\App\CardList::class, function (Faker $faker) {
    Log::debug("HERE");
    return [
        'title' => join(' ', $faker->words()),
        'x' => 0,
        'y' => 0
    ];
});
