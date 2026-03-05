<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriptionController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [SubscriptionController::class, 'index'])->name('dashboard');
    
    // Subscriptions
    Route::get('/subscriptions/create', [SubscriptionController::class, 'create'])->name('subscriptions.create');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::get('/subscriptions/list', [SubscriptionController::class, 'list'])->name('subscriptions.list');
});