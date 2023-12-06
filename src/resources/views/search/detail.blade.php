{{--店舗詳細画面--}}
@extends('layout')
@section('title', '店舗詳細')
@section('stylesheet')
<link rel="stylesheet" href="{{ asset('/css/showdetail.css') }}" >
@endsection
@section('content')

<!-- ローディング画面 -->
<div id="loading">
  <div class="spinner"></div>
</div>

<!-- コンテンツ画面 -->
<div class="content">
	<div class="top_area">
		<ul class="top-name">
			<li><div class="name-kana"></div></li>
			<li><div class="name"></div></li>
		</ul>
		<hr>
		<div class="top-etc">
			<div class="item"><i class="fa-solid fa-tag fa-lg fa-fw"></i><div class="item-title">ジャンル：</div><p class="genre"></p></div>
			<div class="item"><i class="fa-solid fa-map-pin fa-lg fa-fw"></i><div class="item-title">アクセス：</div><p class="access"></p><br><a class="map" target="_blank"><i class="fa-solid fa-map" style="color: #eb7921;"></i>地図を見る</a></div>
			<div class="item"><i class="fa-solid fa-calendar-days fa-lg fa-fw"></i><div class="item-title">定休日：</div><p class="close"></p></div>
		</div>
	</div>
	<div class="explanation_area">
		<div class="image">
			<img class="photo">
		</div>
		<table class="option">
			<tr class="opt-icon">
				<td class="opt-icon-item">
					<i id="parking" class="fa-solid fa-square-parking fa-2x"></i>
				</td>
				<td class="opt-icon-item">
					<i id="wifi" class="fa-solid fa-wifi fa-2x"></i>
				</td>
				<td class="opt-icon-item">
					<i id="pet" class="fa-solid fa-dog fa-2x"></i>
				</td>
				<td class="opt-icon-item">
					<i id="lunch" class="fa-solid fa-sun fa-2x"></i>
				</td>
				<td class="opt-icon-item">
					<i id="bansmoking" class="fa-solid fa-ban-smoking fa-2x"></i>
				</td>
			</tr>
			<tr class="opt-text">
				<td class="opt-text-item">
					<div id="parking-text"></div>
				</td>
				<td class="opt-text-item">
					<div id="wifi-text"></div>
				</td>
				<td class="opt-text-item">
					<div id="pet-text"></div>
				</td>
				<td class="opt-text-item">
					<div id="lunch-text"></div>
				</td>
				<td class="opt-text-item">
					<div id="bansmoking-text"></div>
				</td>
			</tr>
		</table>
	</div>
</div>
<script>
	// PHP変数をJavaScript変数に変換
	window.shop_id = @json($shop_id);
</script>
<script src="{{ asset('/js/showdetail.js') }}"></script>
@endsection