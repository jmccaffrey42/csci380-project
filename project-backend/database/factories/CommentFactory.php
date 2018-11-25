<?php

use Faker\Generator as Faker;
use App\Comment;
use App\User;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'user_id' => User::inRandomOrder()->first()->id,
        'body' => $faker->paragraph
    ];
});
