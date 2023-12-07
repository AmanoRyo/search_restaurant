{{--検索画面--}}
@extends('layout')
@section('title', 'レストラン検索')
@section('stylesheet')
<link rel="stylesheet" href="{{ asset('/css/locationsearch.css') }}" >
@endsection
@section('content')
<div class="content">
	{{--検索エリア--}}
	<div class="input_area">
			<form>
					<div class="search_option">
						<div class="search_msg">こだわり条件でしぼる</div>
						<br>
						{{--こだわり条件--}}
						<div class="kodawari">
							<input name="kodawari-cb" type="checkbox" id="parkings">
							<label class="kodawari-cb" for="parkings">駐車場あり</label>
							<input name="kodawari-cb" type="checkbox" id="wifis">
							<label class="kodawari-cb" for="wifis">WiFiあり</label>
							<input name="kodawari-cb" type="checkbox" id="pets">
							<label class="kodawari-cb" for="pets">ぺットOK</label>
							<input name="kodawari-cb" type="checkbox" id="lunchs">
							<label class="kodawari-cb" for="lunchs">ランチあり</label>
							<input name="kodawari-cb" type="checkbox" id="non_smokings">
							<label class="kodawari-cb" for="non_smokings">禁煙席あり</label>
						</div>
					</div>
					<div class="search_option">
						{{--検索範囲指定--}}
						<div class="search_msg">ココから半径</div>
						<select id="ranges">
								<option value="1">300m</option>
								<option value="2">500m</option>
								<option value="3">1000m </option>
								<option value="4">2000m </option>
								<option value="5">3000m </option>
						</select>
						<div class="search_msg">の店舗をさがす</div>
					</div>
			</form>
			<p>
				{{--検索ボタン--}}
				<button class="get_search"><i class="fa-solid fa-magnifying-glass"></i>さがす</button>
			</p>
	</div>
	{{--検索結果エリア--}}
	<div class="output_area">
		<h2></h2>
		<p class="page"></p>
		<p class="status"></p>
		<p class="loading"></p>
		<div class="main"></div>
		{{--店舗リスト--}}
		<template id="template">
			<form action='{{ route('detail') }}'>
				<button type="submit" class="shoplist">
					<div class="thumbnail">
						<ul>
							<li class="show-photo"><img></li>
						</ul>
					</div>
					<div class="caption">
						<ul>
							<li class="show-name"><i class="fa-solid fa-shop fa-fw"></i><a></a></li>
							<li class="show-access"><i class="fa-solid fa-map-pin fa-fw"></i><a></a></li>
							<li class="show-genre"><i class="fa-solid fa-tag fa-fw"></i><a></a></li>
								@csrf
								<input type="hidden" name="name" class="name">
								<input type="hidden" name="shop_id" class="shop_id">
						</ul>
					</div>
				</button>
			</form>
		</template>
		<br>
		<span class="next"></span>
	</div>
</div>
<script src="{{ asset('/js/locationsearch.js') }}"></script>
@endsection