<?php

namespace App;

class User extends BaseUuidModel
{
    public $fillable = ['name', 'email'];
}
