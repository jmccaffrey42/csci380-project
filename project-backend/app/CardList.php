<?php

namespace App;

class CardList extends BaseUuidModel
{
    public $fillable = ['user_id', 'title', 'x', 'y'];

    public function cards() {
        return $this->hasMany("\App\Card");
    }
}
