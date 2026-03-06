<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [SubscriptionController::class, 'index'])->name('dashboard');

    Route::prefix('subscriptions')->name('subscriptions.')->group(function () {

        Route::get('/list', [SubscriptionController::class, 'list'])->name('list');
        Route::get('/create', [SubscriptionController::class, 'create'])->name('create');
        Route::post('/', [SubscriptionController::class, 'store'])->name('store');

        Route::get('/{subscription}/edit', [SubscriptionController::class, 'edit'])->name('edit');
        Route::patch('/{subscription}', [SubscriptionController::class, 'update'])->name('update');
        Route::delete('/{subscription}', [SubscriptionController::class, 'destroy'])->name('destroy');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::get('/settings', function () {
        return Inertia::render('Settings'); 
    })->name('settings');
});

require __DIR__ . '/auth.php';