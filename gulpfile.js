var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
});

elixir(function(mix) {
	mix.scripts([
		'resources/assets/js/components/Navbar.js',
		'resources/assets/js/components/LoginForm.js',
		'resources/assets/js/components/Manual.js',
		'resources/assets/js/components/validate.js',
		'resources/assets/js/components/Counter.js',
		'resources/assets/js/components/App.js',
	], 'public/js/app.js');
});

elixir(function(mix) {
	mix.scriptsIn('resources/assets/js/utils', 'public/js/utils.js');
});

elixir(function(mix) {
	mix.stylesIn('resources/assets/css');
});
