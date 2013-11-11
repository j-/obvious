var term = require('term');

var repeatString = function (string, count) {
	return new Array(count + 1).join(string);
};

var drawScreen = function (w, h, bg) {
	var output =
		term.cursor.home() +
		term.color.bg(
			repeatString(' ', w * (h - 1)),
			bg
		);
	return output;
};

var loop = function () {
	var w = process.stdout.columns;
	var h = process.stdout.rows;
	var alt = Date.now() % 500 < 250;
	var bg = alt ? term.color.WHITE : term.color.BLACK;
	var output = drawScreen(w, h, bg);
	process.stdout.write(output);
};

(function inner () {
	loop();
	setImmediate(inner);
})();