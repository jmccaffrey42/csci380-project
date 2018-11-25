<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BaseUuidModel extends Model
{
    public $incrementing = false;
    public $primaryKey = 'id';

    public static function boot()
    {
        parent::boot();

        static::creating(function ($instance) {
            $instance->id = uuid4();
        });
    }
}
