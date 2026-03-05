<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\SubscriptionController;
use Inertia\Inertia;
use App\Models\Subscription;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/subscriptions/create', function () {
    return Inertia::render('subscriptions/create');
})->name('subscriptions.create');

Route::post('/subscriptions', [SubscriptionController::class, 'store']);

Route::get('/dashboard', function () {
    return Inertia::render('dashboard', [
        'subscriptions' => Subscription::all(), // ← dito nanggagaling ang data sa table
    ]);
})->name('dashboard');

require __DIR__ . '/settings.php';
