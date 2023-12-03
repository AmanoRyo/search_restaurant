{{--検索画面--}}
@extends('layout')
@section('title', 'レストラン検索')
@section('content')
<div class="search">
	<h3>現在地を取得しグルメサーチAPIを利用して近隣のお店を表示します。</h3>
	<div class="top">
			<form>
					<label for="ranges">検索範囲</label>
					<select id="ranges">
							<option value="1">300m</option>
							<option value="2">500m</option>
							<option value="3">1000m </option>
							<option value="4">2000m </option>
							<option value="5">3000m </option>
					</select>
					{{--APIキーを隠しデータとしてクエリの1要素に登録--}}
					<input type="hidden" id="apikey" value="{{ config('hotpepper.api_key') }}">
			</form>
			<button class="get_search">現在地取得</button>
	</div>
	<div class="result_area">
		<p class="status"></p>
		<a class="map-link" target="_blank" rel="noopener"></a>
		<h2></h2>
		<p class="page"></p>
		<span></span>
		<div class="next"></div>
		<div class="main"></div>
		<template id="template">
				<ul class="shoplist">
					<div class="item">
						<li class="photo"><img class="shop"></li>
					</div>
					<div class="item">
						<li class="name"><i class="fa-solid fa-shop"></i><a class="shop"></a></li>
						<li class="access"><i class="fa-solid fa-map-pin"></i><a class="address"></a></li>
						<li class="open"></li>
					</div>
				</ul>
		</template>
	</div>
</div>
<script src="{{ asset('/js/geolocation.js') }}"></script>
@endsection