@extends('layouts.master')

@section('layouts.navbar')
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
	    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
	      <span class="sr-only">Toggle navigation</span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
	    </button>
	    <a class="navbar-brand" href="#">Hearing CMS</a>
	  </div>

      <div class="collapse navbar-collapse" id="myNavbar">
	    <ul class="nav navbar-nav">
	      <li><a href="#">Home</a></li>
		  <li class="active"><a href="#">Validate</a></li>
	      <li><a href="#">Import</a></li>
	      <li><a href="#">Export</a></li>
	      <li><a href="#">Statistics</a></li>
	      <li><a href="#">Admin</a></li>
	    </ul>

	    <ul class="nav navbar-nav navbar-right">
	      <li><a href="#"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
	    </ul>
	  </div>
	</div>
  </nav>
@endsection
