<?php
// javascriptから送られてきたクエリを変数に代入
$key = $_POST['key'];
$shop_id = $_POST['shop_id']; 

// クエリをまとめる
$query = [
    'key' => $key,  // APIキー
    'id' => $shop_id, // 店舗ID
    'format' => 'json', // レスポンス形式
];
// グルメサーチAPIからjsonを取得
$url = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?';
$url .= http_build_query($query);
$response = file_get_contents($url);
$json = json_encode($response);

echo ($json);