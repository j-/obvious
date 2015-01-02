var getScreen = require('./get-screen');
var state = {};

var init = function (options) {
	var screenName = options.screen;
	getScreen(screenName, function (err, Screen) {
		if (err) {
			console.error('Could not get screen');
			console.error(err.message);
			return;
		}
		startScreen(Screen, options);
	});
};

var startScreen = function (Screen, options) {
	state.screen = new Screen(options);
	state.screen.start();
	(function loop () {
		state.screen.update(Date.now());
		state.timer = setTimeout(loop, options.interval);
	})();
	process.on('SIGINT', function () {
		clearTimeout(state.timer);
		state.screen.stop();
		process.exit();
	});
};

module.exports = init;