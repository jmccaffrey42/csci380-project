<?php

use Faker\Generator as Faker;
use \App\User;

$factory->define(\App\Card::class, function (Faker $faker) {
    return [
        'title' => join(' ', $faker->words(5)),
        'description' => join('<br/>', $faker->sentences(5)),
        'sort_order' => 0,
        'user_id' => User::inRandomOrder()->first()->id,
        'labels' => ''
    ];
});
