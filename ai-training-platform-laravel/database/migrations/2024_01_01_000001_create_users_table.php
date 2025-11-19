<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('image')->nullable();
            $table->integer('level')->default(1);
            $table->integer('xp')->default(0);
            $table->string('selected_class')->nullable(); // Developer, Designer, Project Manager, Content Creator, Sales & Business Dev
            $table->timestamps();
        });

        Schema::create('accounts', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->string('type');
            $table->string('provider');
            $table->string('provider_account_id');
            $table->text('refresh_token')->nullable();
            $table->text('access_token')->nullable();
            $table->integer('expires_at')->nullable();
            $table->string('token_type')->nullable();
            $table->string('scope')->nullable();
            $table->text('id_token')->nullable();
            $table->string('session_state')->nullable();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['provider', 'provider_account_id']);
        });

        // Sessions table created separately for Laravel session management

        Schema::create('verification_tokens', function (Blueprint $table) {
            $table->string('identifier');
            $table->string('token')->unique();
            $table->timestamp('expires');
            
            $table->unique(['identifier', 'token']);
        });

        Schema::create('achievements', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->string('title');
            $table->text('description');
            $table->string('icon');
            $table->timestamp('unlocked_at')->useCurrent();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('progress', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id');
            $table->string('module_id');
            $table->string('module_name');
            $table->boolean('completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->integer('xp_earned')->default(0);
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progress');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('verification_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('accounts');
        Schema::dropIfExists('users');
    }
};

