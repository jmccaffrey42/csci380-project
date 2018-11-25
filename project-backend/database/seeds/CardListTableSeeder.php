<?php

use Illuminate\Database\Seeder;

use App\CardList;

class CardListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CardList::truncate();

        $faker = \Faker\Factory::create();

        for($i = 0; $i < 5; $i++) {

        }
    }
}
