<!doctype html>
<html lang="en">
  <head>
    <title>Hearing CMS</title>
	<meta charset="utf-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="A CMS to manage voice samples of children">

	<!-- React -->
	<script src="https://fb.me/react-15.2.1.js"></script>
	<script src="https://fb.me/react-dom-15.2.1.js"></script>

	<!-- Babel -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>

	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>

	<!-- pubsubjs -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pubsub-js/1.5.3/pubsub.min.js"></script>

	<!-- Bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

	<!-- Wrapper for AJAX requests with Access Token -->
	<script src="{{ URL::asset('js/utils.js') }}"></script>

	<!-- Bootswatch Paper Theme -->
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" rel="stylesheet" integrity="sha384-2mX2PSpkRSXLQzmNzH3gwK6srb06+OfbDlYjbog8LQuALYJjuQ3+Yzy2JIWNV9rW" crossorigin="anonymous">
  
	<!-- Font Awesome -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">

	<link href="{{ URL::asset('css/all.css') }}" rel="stylesheet">
  </head>

  <body>
    
	@yield('content')

  </body>

</html>
