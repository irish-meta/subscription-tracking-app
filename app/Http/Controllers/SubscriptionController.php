<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function create()
    {
        return Inertia::render('subscriptions/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'service_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'billing_cycle' => 'required|string',
        ]);

        Subscription::create([
            'full_name' => $request->full_name,
            'service_name' => $request->service_name,
            'price' => $request->price,
            'billing_cycle' => $request->billing_cycle,
            'status' => 'Active',
        ]);

        return redirect()->route('dashboard')->with('success', 'Subscription added!');
    }
}