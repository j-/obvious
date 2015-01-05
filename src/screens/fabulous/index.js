var Base = require('../base');
var term = require('term');
var rgb = require('./rgb');

var Fabulous = Base.extend({
	init: function () {
		this.spread = 3;
		this.freq = 0.1;
		this.outputChar = ' ';
	},
	start: function () {
		var output = term.cursor.hide();
		process.stdout.write(output);
	},
	stop: function () {
		var output = rgb.wrap([term.color.FG + term.color.RESET, term.color.BG + term.color.RESET]);
		output += term.clear.all() + term.cursor.home();
		process.stdout.write(output);
	},
	rainbow: function (freq, i) {
		var red   = Math.sin(freq * i + 0              ) * 127 + 128;
		var green = Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128;
		var blue  = Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128;
		return rgb.rgb(red, green, blue, true);
	},
	update: function (t) {
		var w = this.getWidth();
		var h = this.getHeight();
		var len = w * (h - 1);
		var output = '';
		var os, color, code;
		for (var i = 0; i < len; i++) {
			os = Math.floor(i / w);
			color = this.rainbow(
				this.freq,
				os + i / this.spread
			);
			code = rgb.wrap([color]);
			output += code + this.outputChar;
		}
		process.stdout.write(output);
	},
	getWidth: function () {
		return process.stdout.columns;
	},
	getHeight: function () {
		return process.stdout.rows;
	},
});

module.exports = Fabulous;