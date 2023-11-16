<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\StoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => "v1",
], function () {
    Route::group([
        'prefix' => "auth",
    ], function () {
        Route::post('signin', [AuthController::class, 'signin'])->name('api.auth.signin');
        Route::get('token/getInfo', [AuthController::class, 'getInfo'])->name('api.auth.getInfo');
        Route::post('/password/forget', [AuthController::class, 'forget'])->name('api.auth.forget');
        Route::post('/password/reset/', [AuthController::class, 'reset'])->name('api.auth.reset');
        Route::post('/password/change', [AuthController::class, 'change'])->middleware(['auth:api'])->name('api.auth.change');
    });

    Route::group([
        'prefix' => "users",
        'middleware' => ['auth:api','access:admin'],
    ], function () {
        Route::get('list', [UsersController::class, 'index']);
        Route::get('get-data-create', [UsersController::class, 'getDataCreate']);
        Route::post('create', [UsersController::class, 'create']);
        Route::get('{id}', [UsersController::class, 'show']);
        Route::post('{id}/update', [UsersController::class, 'update']);
        Route::post('delete', [UsersController::class, 'delete']);
    });

    Route::group([
        'prefix' => "stores",
        'middleware' => ['auth:api'],
    ], function () {
        Route::get('list', [StoreController::class, 'index']);
        Route::get('get-data-create', [StoreController::class, 'getDataCreate']);
        Route::get('get-postal-code', [StoreController::class, 'getPostalCode']);
        Route::get('{id}', [StoreController::class, 'show']);
        Route::post('create', [StoreController::class, 'create'])->middleware(['access:admin,lc']);
        Route::post('{id}/update', [StoreController::class, 'update'])->middleware(['access:admin,lc']);
        Route::post('{id}/approve', [StoreController::class, 'approve'])->middleware(['access:admin,lc']);
        Route::post('delete', [StoreController::class, 'delete'])->middleware(['access:admin,lc']);
    });
});
