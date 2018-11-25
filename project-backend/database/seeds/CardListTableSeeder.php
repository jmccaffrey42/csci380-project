<?php

use Illuminate\Database\Seeder;

use App\CardList;
use App\Card;
use App\User;
use App\Comment;

class CardListTableSeeder extends Seeder
{
    public function run()
    {
        factory(CardList::class, 10)->create()->each(function ($list) {
            $cards = factory(Card::class, random_int(2, 10))->make();
            $list->cards()->saveMany($cards);
            $cards->each(function(Card $card) {
                $numUsers = random_int(0,3);
                if ($numUsers > 0) {
                    $card->members()->attach(User::inRandomOrder()->limit($numUsers)->get());
                }
                $numComments = random_int(0, 5);
                if ($numComments > 0) {
                    $card->comments()->saveMany(factory(Comment::class, $numComments)->make());
                }
            });
        });
    }
}
