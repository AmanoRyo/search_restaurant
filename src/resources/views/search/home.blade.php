{{--検索画面--}}
@extends('layout')
@section('title', 'レストラン検索')
@section('content')
<div class="content">
	<div class="input_area">
			<form>
					<label for="ranges">検索範囲</label>
					<select id="ranges">
							<option value="1">300m</option>
							<option value="2">500m</option>
							<option value="3">1000m </option>
							<option value="4">2000m </option>
							<option value="5">3000m </option>
					</select>
			</form>
			<button class="get_search"><i class="fa-solid fa-magnifying-glass"></i>さがす</button>
	</div>
	<div class="output_area">
		<p class="status"></p>
		<a class="map-link" target="_blank" rel="noopener"></a>
		<h2></h2>
		<p class="page"></p>
		<span></span>
		<div class="next"></div>
		<div class="main"></div>
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
							<li class="show-name"><i class="fa-solid fa-shop"></i><a></a></li>
							<li class="show-access"><i class="fa-solid fa-map-pin"></i><a></a></li>
							<li class="show-open"></li>
								@csrf
								<input type="hidden" name="name" class="name">
								<input type="hidden" name="shop_id" class="shop_id">
						</ul>
					</div>
				</button>
			</form>
		</template>
	</div>
</div>
<script src="{{ asset('/js/locationsearch.js') }}"></script>
@endsection