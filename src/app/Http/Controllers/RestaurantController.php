<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class RestaurantController extends Controller
{
    // 店舗詳細の表示
    public function showDetail(){
        return view('search.detail');
    }
}
