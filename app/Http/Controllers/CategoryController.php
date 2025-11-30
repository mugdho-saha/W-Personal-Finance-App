<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::orderBy('created_at', 'desc')->get();
        return Inertia::render('Category/Index', compact('categories'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories',
            'category_type' => 'required|string|max:255',
        ]);
        Category::create($validated);
        return redirect()
            ->route('categories')
            ->with('success', 'Category added successfully!');
    }

    public function destroy($category_id)
    {
        $category = Category::findOrFail($category_id);
        $category->delete();

        return redirect()
            ->route('categories')
            ->with('success', 'Category deleted successfully!');
    }
}
