<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class CardUser extends Pivot
{
    public static function fromRawAttributes(Model $parent, $attributes, $table, $exists = false)
    {
        if (!$exists and !array_key_exists('id', $attributes)) {
            $attributes['id'] = uuid4();
        }
        return parent::fromRawAttributes($parent, $attributes, $table, $exists);
    }
}
