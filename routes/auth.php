<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', function () {
        return Inertia::render('auth/register');
    })->name('register');

    Route::get('login', function () {
        return Inertia::render('auth/login');
    })->name('login');

});

Route::middleware('auth')->group(function () {
    Route::post('logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});