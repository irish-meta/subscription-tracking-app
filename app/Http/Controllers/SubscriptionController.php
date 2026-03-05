<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SubscriptionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'subscriptions' => auth()->user()->subscriptions()->latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('subscriptions/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'plan_type' => 'required|string',
            'billing_term' => 'required|string',
            'subscription_date' => 'required|date',
            'renewal_date' => 'required|date',
        ]);

        $request->user()->subscriptions()->create($validated);

        return redirect()->route('dashboard');
    }

    public function list(): Response
    {
        return Inertia::render('subscriptions/list', [
            'subscriptions' => auth()->user()->subscriptions()->latest()->get()
        ]);
    }
}