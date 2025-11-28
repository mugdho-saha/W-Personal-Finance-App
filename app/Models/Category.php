<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $primaryKey = 'category_id';

    protected $table = 'categories';

    protected $fillable = [
        'category_name',
        'category_type',
        'status',
    ];
}
