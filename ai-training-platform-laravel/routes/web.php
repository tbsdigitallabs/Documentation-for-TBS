<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ClassSelectionController;
use App\Http\Controllers\DevelopersController;
use App\Http\Controllers\DesignersController;
use App\Http\Controllers\ProjectManagersController;
use App\Http\Controllers\ContentCreatorsController;
use App\Http\Controllers\SalesBusinessDevController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\AuthController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/class-selection', [ClassSelectionController::class, 'index'])->name('class-selection');

// Role pages
Route::get('/developers', [DevelopersController::class, 'index'])->name('developers');
Route::get('/designers', [DesignersController::class, 'index'])->name('designers');
Route::get('/project-managers', [ProjectManagersController::class, 'index'])->name('project-managers');
Route::get('/content-creators', [ContentCreatorsController::class, 'index'])->name('content-creators');
Route::get('/sales-business-dev', [SalesBusinessDevController::class, 'index'])->name('sales-business-dev');

// Module pages
Route::get('/{role}/module-{module}', [ModuleController::class, 'show'])
    ->where(['role' => 'developers|designers|project-managers|content-creators|sales-business-dev', 'module' => '[1-9]'])
    ->name('module.show');

// Authentication
Route::get('/auth/signin', [AuthController::class, 'showSignIn'])->name('auth.signin');
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
Route::post('/auth/signout', [AuthController::class, 'signOut'])->name('auth.signout');
