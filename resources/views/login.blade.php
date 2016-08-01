@extends('layouts.master')

@section('content')
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div id="loginform"></div>
      <script type="text/babel" src="{{ URL::asset('js/LoginForm.js') }}"></script>
	</div>
  </div>
@endsection
