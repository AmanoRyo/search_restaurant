{{--店舗詳細画面--}}
@extends('layout')
@section('title', '店舗詳細')
@section('content')
<div>
	<p class="name"></p>
	<p class="access"></p>
	<p class="open"></p>
	<img class="photo">
</div>
<script>
	// PHP変数をJavaScript変数に変換
	window.shop_id = @json($shop_id);
</script>
<script src="{{ asset('/js/showdetail.js') }}"></script>
@endsection