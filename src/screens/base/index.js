var ok = require('okaylib');

/**
 * Base screen class for other screens to inherit from. Has no functionality.
 * @constructor
 */
var Base = ok.Base.extend({
	/**
	 * Initialize state. Called when instance is constructed.
	 * @param {Object} options Options hash
	 */
	init: function () {

	},
	/**
	 * Setup method, called when screen is started.
	 */
	start: function () {

	},
	/**
	 * Teardown method, called when screen is stopped.
	 */
	stop: function () {

	},
	/**
	 * Called periodically with timestamp. Use to update screen.
	 * @param {Number} t Timestamp as integer (in milliseconds). From unix time.
	 */
	update: function () {

	}
});

module.exports = Base;