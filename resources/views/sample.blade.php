@extends('layouts.navbar')

@section('content')
<div class="row">
  <div class="col-md-4 col-md-offset-1">
    <div class="row">
      <div class="col-md-12"> 
	    <div id="counter"></div>
        <script type="text/babel" src="{{ URL::asset('js/Counter.js') }}"></script>
	  </div>
	</div>

    <div class="row">
	  <div class="col-md-12">
        <div id="manual"></div>
        <script type="text/babel" src="{{ URL::asset('js/Manual.js') }}"></script>
	  </div>
	</div>
  </div>

  <div class="col-md-6">
    <div id="card"></div>
    <script type="text/babel" src="{{ URL::asset('js/validate.js') }}"></script>
  </div>
</div>
@endSection
