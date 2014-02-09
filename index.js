process.title = 'ATTENTION';

const PERIOD = 500;

var term = require('term');

var repeatString = function (string, count) {
	return new Array(count + 1).join(string);
};

var drawScreen = function (w, h, bg) {
	var output =
		term.color.bg(
			repeatString(' ', w * (h - 1)),
			bg
		) +
		term.cursor.home();
	return output;
};

var currentState = false;
var loop = function () {
	var alt = Date.now() % PERIOD < (PERIOD / 2);
	if (alt !== currentState) {
		var w = process.stdout.columns;
		var h = process.stdout.rows;
		var bg = alt ? term.color.WHITE : term.color.BLACK;
		var output = drawScreen(w, h, bg);
		currentState = alt;
		process.stdout.write(output);
	}
};

var init = function () {
	var output = term.cursor.hide();
	process.stdout.write(output);
};

var finish = function () {
	var output = term.clear.all() + term.cursor.home();
	process.stdout.write(output);
};

init();
(function inner () {
	loop();
	setImmediate(inner);
})();

process.on('SIGINT', function () {
	finish();
	process.exit();
});