<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeExpense extends Model
{
    protected $table = 'income_expenses';
    protected $primaryKey = 'income_expense_id';

    protected $fillable = [
        'category_id',
        'type',
        'date',
        'amount',
        'note',
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }
}
