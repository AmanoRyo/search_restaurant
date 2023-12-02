{{--検索画面--}}
@extends('layout')
@section('title', 'レストラン検索')
@section('content')
<div class="search_area">
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
			<button>現在地取得</button>
	</div>
	<div class="ressult_area">
		<p class="status"></p>
		<a class="map-link" target="_blank" rel="noopener"></a>
		<h2></h2>
		<p class="page"></p>
		<span></span>
		<div class="next"></div>
		<div class="main"></div>
		<template id="template">
				<ul>
						<li class="name"><a class="shop"></a></li>
						<li class="access"><a class="map"></a></li>
						<li class="average"></li>
						<li class="open"></li>
				</ul>
		</template>
	</div>
</div>
<script src="{{ asset('/js/geolocation.js') }}"></script>
@endsection