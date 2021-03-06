<?php

namespace App;

class Comment extends BaseUuidModel
{
    public $fillable = ['body', 'user_id', 'card_id'];

    function user() {
        return $this->belongsTo('App\User');
    }
}
