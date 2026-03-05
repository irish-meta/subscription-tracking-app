<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');       // ✅ Add this
            $table->string('service_name');    // ✅ Add this
            $table->decimal('price', 10, 2);  // ✅ Price as decimal
            $table->string('billing_cycle');  // ✅ Monthly/Yearly
            $table->string('status')->default('Active'); // ✅ Status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
