<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class RestaurantController extends Controller
{
    // 店舗詳細の表示
    public function showDetail(Request $request){
        $shop_id = $request["shop_id"];
        $apikey = $request["apikey"];
        return view('search.detail',[
            'shop_id' => $shop_id,
            'apikey' => $apikey,
        ]);
    }
}
