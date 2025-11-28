<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        return Inertia::render('Category/Index', []);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories',
            'category_type' => 'required|string|max:255',
        ]);
        Category::create($validated);
        return Redirect::route('category.index');
    }
}
