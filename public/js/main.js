requirejs.config({
    baseUrl: '/js/',
    paths: {
		lib		: 'libs',
		jquery: 'libs/jquery/jquery-1.8.0.min',
		underscore: 'libs/underscore/underscore.amd.1.4.2.min',
		backbone: 'libs/backbone/backbone.amd.0.9.2'

    }
});
require([
	"functions",
	"app"
	//"jquery/prefixFree/prefixfree.1.0.7.min",
	//"app"
],
function(fnc,App) {
	App.initialize();
});



