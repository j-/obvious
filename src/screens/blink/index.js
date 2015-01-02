var Base = require('../base');
var term = require('term');

/**
 * Takes a string and repeats it a given number of times.
 * @private
 * @param {string} string The string to repeat
 * @param {int} count Number of times to repeat the string
 */
var repeatString = function (string, count) {
	return new Array(count + 1).join(string);
};

var Blink = Base.extend({
	init: function () {
		this.period = 500;
	},
	start: function () {
		var output = term.cursor.hide();
		process.stdout.write(output);
	},
	stop: function () {
		var output = term.clear.all() + term.cursor.home();
		process.stdout.write(output);
	},
	update: function (t) {
		t %= this.period * 2;
		if (t < this.period) {
			this.showBlink();
		}
		else {
			this.showNoblink();
		}
	},
	getWidth: function () {
		return process.stdout.columns;
	},
	getHeight: function () {
		return process.stdout.rows;
	},
	showBlink: function () {
		this.showScreen(term.color.WHITE);
	},
	showNoblink: function () {
		this.showScreen(term.color.RESET);
	},
	showScreen: function (bg) {
		var w = this.getWidth();
		var h = this.getHeight();
		var str = repeatString(' ', w * (h - 1));
		var output =
			term.color.bg(str, bg) +
			term.cursor.home();
		process.stdout.write(output);
	}
});

module.exports = Blink;