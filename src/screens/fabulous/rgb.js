var term = require('term');
var mode = 256;

/**
 * Returns nearest supported 256-color an rgb value, without fore-/background
 *   information
 * @see https://github.com/janlelis/paint/blob/9810001bfda5588fcbaecbbca06caa75d3b4ac19/lib/paint.rb#L227-246
 */
var rgbValue = function (red, green, blue) {
	var sep = 42.5;
	var gray, result;
	while (true) {
		if (red < sep || green < sep || blue < sep) {
			gray = red < sep && green < sep && blue < sep;
			break;
		}
		sep += 42.5;
	}
	if (gray) {
		result = 232 + Math.round((red + green + blue) / 33);
	}
	else {
		result = 16;
		result += Math.floor(6 * red / 256) * 36;
		result += Math.floor(6 * green / 256) * 6;
		result += Math.floor(6 * blue / 256);
	}
	return ';5;' + result;
};

/**
 * @param {String[]} ansiCodes Array of codes to use
 * @return {String} Ansi code
 */
var wrap = function (ansiCodes) {
	return term.CSI + ansiCodes.join(term.SEP) + 'm';
};

/**
 * Get the color code closest matching given RGB values.
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @param {Number} [background=false]
 * @return {String} Ansi code
 */
var rgb = function (red, green, blue, background) {
	if (arguments.length < 4) {
		background = false;
	}
	if (mode === 8 || mode === 16) {
		return String(background ? 4 : 3) + rgbLikeValue(red, green, blue, mode === 16);
	}
	else {
		return String(background ? 48 : 38) + rgbValue(red, green, blue);
	}
};

module.exports = {
	rgb: rgb,
	wrap: wrap
};