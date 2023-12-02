<!DOCTYPE html>
<html lang="ja">
<head>
		<meta charset="UTF-8">
		<title>@yield('title')</title>
		<link rel="stylesheet" href="{{ asset('/css/base.css') }}" >
</head>
<body>

	<header>
		@include('header')
	</header>

	<div class="containter">
		@yield('content')
	</div>

	<footer>
		@include('footer')
	</footer>

</body>
</html>
