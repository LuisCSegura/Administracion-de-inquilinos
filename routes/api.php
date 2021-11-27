<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/tenants', [App\Http\Controllers\UserController::class, 'index']);
Route::post('/tenants', [App\Http\Controllers\UserController::class, 'store']);
Route::put('/tenants/{tenant}', [App\Http\Controllers\UserController::class, 'update']);
Route::delete('/tenants/{tenant}', [App\Http\Controllers\UserController::class, 'destroy']);

