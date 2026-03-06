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

        return redirect()->route('subscriptions.list')
            ->with('success', 'Subscription added successfully!');
    }

    public function list(Request $request): Response
    {
        return Inertia::render('subscriptions/list', [
            'subscriptions' => auth()->user()->subscriptions()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('service_name', 'like', "%{$search}%")
                          ->orWhere('category', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate($request->input('per_page', 10))
                ->withQueryString(),
            'filters' => $request->only(['search', 'per_page'])
        ]);
    }

    public function edit(Subscription $subscription): Response
    {
        if ($subscription->user_id !== auth()->id()) abort(403);
        return Inertia::render('subscriptions/edit', ['subscription' => $subscription]);
    }

    public function update(Request $request, Subscription $subscription): RedirectResponse
    {
        if ($subscription->user_id !== auth()->id()) abort(403);
        
        $subscription->update($request->all());
        
        return redirect()->route('subscriptions.list')->with('success', 'Updated successfully!');
    }

    public function destroy(Subscription $subscription): RedirectResponse
    {
        if ($subscription->user_id !== auth()->id()) abort(403);
        $subscription->delete();
        
        return redirect()->route('subscriptions.list')->with('success', 'Deleted successfully!');
    }
}