<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IncomeExpenseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    /*category controllers*/
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::post('/categories/{category_id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    /*income expense routes*/
    Route::get('/income-expense',[IncomeExpenseController::class, 'index'])->name('income-expense.index');
    Route::post('/income-expense',[IncomeExpenseController::class, 'store'])->name('income-expense.store');
    Route::post('/income-expanse/{income_expanse_id}', [IncomeExpenseController::class, 'destroy'])->name('income-expense.destroy');
});

require __DIR__.'/settings.php';
