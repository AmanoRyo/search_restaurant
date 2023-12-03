<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// 検索画面
Route::get('/', function () {
    return view('search.home');
});

// 詳細画面
Route::get('detail', 'RestaurantController@showDetail')->name('detail');