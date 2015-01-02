var fs = require('fs');
var path = require('path');
var screensDir = path.resolve(__dirname, './screens');

module.exports = function (name, callback) {
	fs.readdir(screensDir, function (err, screens) {
		if (err) {
			callback(err);
			return;
		}
		if (screens.indexOf(name) !== -1) {
			var screenPath = path.resolve(screensDir, name);
			var screenExport = require(screenPath);
			callback(null, screenExport);
		}
		else {
			err = new Error('Could not find screen with name "' + name + '"');
			callback(err);
		}
	});
};