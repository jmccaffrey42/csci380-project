<?php

namespace App;

class Card extends BaseUuidModel
{
    public $fillable = ['card_list_id', 'user_id', 'title', 'description', 'labels', 'sort_order'];

    public function cardList() {
        return $this->belongsTo('App\CardList');
    }

    public function members() {
        return $this->belongsToMany('App\User')->using(CardUser::class);
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
