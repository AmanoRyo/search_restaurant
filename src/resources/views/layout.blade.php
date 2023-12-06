{{--共通レイアウト--}}
<!DOCTYPE html>
<html lang="ja">
<head>
		<meta charset="UTF-8">
		<title>@yield('title')</title>
		<input type="hidden" id="apikey" value="{{ config('hotpepper.api_key') }}">
		<link rel="stylesheet" href="{{ asset('/css/base.css') }}" >
		<link href="https://use.fontawesome.com/releases/v6.5.0/css/all.css" rel="stylesheet">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap" rel="stylesheet">
		@yield('stylesheet')
</head>
<body>

	<header>
		@include('header')
	</header>

	<div class="containter">
		@yield('content')
	</div>

	<footer style="margin-top: auto">
		@include('footer')
	</footer>

</body>
</html>
