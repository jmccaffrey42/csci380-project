<?php

namespace App;

class Card extends BaseUuidModel
{
    public $fillable = ['card_list_id', 'user_id', 'title', 'description', 'labels', 'members'];

    public function cardList() {
        return $this->belongsTo('App\CardList');
    }
}
