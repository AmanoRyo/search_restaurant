<?php
// javascriptから送られてきたクエリを変数に代入
$key = $_POST['key'];
$latitude = $_POST['latitude']; 
$longitude = $_POST['longitude'];
$range = $_POST['range'];
$parking = $_POST['parking'];
$wifi = $_POST['wifi'];
$pet = $_POST['pet'];
$lunch = $_POST['lunch'];
$non_smoking = $_POST['non_smoking'];
$start = $_POST['start'];

// クエリをまとめる
$query = [
    'key' => $key,  // APIキー
    'lat' => $latitude, // 緯度
    'lng' => $longitude, // 経度
    'range' => $range, // 検索範囲
    'parking' => $parking,  // 駐車場の有無
    'wifi' => $wifi,    // wifiの有無
    'pet' => $pet,  // ぺットの可否
    'lunch' => $lunch,  // ランチの有無
    'non_smoking' => $non_smoking,  // 禁煙席の有無
    'start' => $start, // 検索の開始位置
    'format' => 'json', // レスポンス形式
];
// グルメサーチAPIからjsonを取得
$url = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?';
$url .= http_build_query($query);
$response = file_get_contents($url);
$json = json_encode($response);

echo ($json);