<?php

namespace App;

class User extends BaseUuidModel
{
    public $fillable = ['name', 'email'];

    public function cardsMembersOf() {
        return $this->belongsToMany('App\Card')->using(CardUser::class);
    }

    public function cardsCreatedBy() {
        return $this->hasMany('App\Card');
    }
}
