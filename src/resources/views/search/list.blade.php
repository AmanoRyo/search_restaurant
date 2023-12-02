{{--検索結果画面--}}
@extends('layout')
@section('title', '検索結果')
@section('content')
<table border="1">
	<tr>
			<th>店舗名</th>
			<th>営業時間</th>
	</tr>
	@for ($i = 0; $i < $restaurants['results_returned']; $i++)
			<tr>
					<td><a href="{{{ $restaurants['shop'][$i]['urls']['pc'] }}}">{{{ $restaurants['shop'][$i]['name'] }}}</a></td>
					<td>{{{ $restaurants['shop'][$i]['open'] }}}</td>
			</tr>
	@endfor
</table>
@endsection