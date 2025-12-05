<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\IncomeExpense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IncomeExpenseController extends Controller
{
    public function index(){
        $categories = Category::where('status', 1)->orderBy('category_name', 'asc')->get();
        $entries = IncomeExpense::with('category')->orderBy('date','desc')->get();
        return Inertia::render('IncomeExpense/Index', compact('categories', 'entries'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,category_id',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'note' => 'nullable|string',
        ]);
        IncomeExpense::create($validated);
        return Redirect::route('income-expense.index');
    }


    public function destroy($income_expanse_id){
        IncomeExpense::destroy($income_expanse_id);
        return Redirect::route('income-expense.index');
    }
}
