var docopt = require('docopt').docopt;
var fs = require('fs');
var USAGE = fs.readFileSync('./USAGE', 'utf-8');
var options = docopt(USAGE, {
	help: true,
	version: require('./package.json').version
});

var term = require('term');

process.title = 'obvious';

/**
 * Flash one whole cycle within this period (in milliseconds).
 *
 * @const {int}
 * @default 500
 */
const PERIOD = 500;

/**
 * Takes a string and repeats it a given number of times.
 *
 * @param {string} string The string to repeat
 * @param {int} count Number of times to repeat the string
 */
var repeatString = function (string, count) {
	return new Array(count + 1).join(string);
};

/**
 * Fill the terminal buffer with a given color.
 *
 * @param {int} w Width of terminal
 * @param {int} h Height of terminal
 * @param {int} bg ANSI color to fill screen with
 * @see http://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
var drawScreen = function (w, h, bg) {
	var str = repeatString(' ', w * (h - 1));
	var output =
		term.color.bg(str, bg) +
		term.cursor.home();
	return output;
};

/**
 * Store the current state of the screen as a boolean. `false` is black and
 * `true` is white.
 *
 * @type {boolean}
 */
var currentState = false;

/**
 * Main loop. This function is executed frequently.
 */
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

/**
 * Set up the terminal for main function.
 */
var init = function () {
	var output = term.cursor.hide();
	process.stdout.write(output);
};

/**
 * Clean up the terminal after main function.
 */
var finish = function () {
	var output = term.clear.all() + term.cursor.home();
	process.stdout.write(output);
};

/**
 * Begin execution.
 */
(function () {
	init();
	(function inner () {
		loop();
		setTimeout(inner, 10);
	})();

	process.on('SIGINT', function () {
		finish();
		process.exit();
	});
})();