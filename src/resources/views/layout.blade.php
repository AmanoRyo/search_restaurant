<!DOCTYPE html>
<html lang="ja">
<head>
		<meta charset="UTF-8">
		<title>@yield('title')</title>
		<link rel="stylesheet" href="{{ asset('/css/base.css') }}" >
		<link href="https://use.fontawesome.com/releases/v6.5.0/css/all.css" rel="stylesheet">
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
