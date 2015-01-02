var util = require('./util');

/**
 * Base screen class for other screens to inherit from. Has no functionality.
 * @constructor
 */
var Base = function () {
	this.init.apply(this, arguments);
};

Base.prototype = {
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
	 * Terdown method, called when screen is stopped.
	 */
	stop: function () {

	},
	/**
	 * Called periodically with timestamp. Use to update screen.
	 * @param {Number} t Timestamp as integer (in milliseconds). From unix time.
	 */
	update: function () {

	}
};

/**
 * Create a child constructor of this class with an extended prototype.
 * @example
 *     var Foo = Base.extend({ bar: 'baz' });
 *     var foo = new Foo();
 *     console.log(foo.bar); // => "baz"
 * @param {Object=} proto Prototype methods
 * @return {Function} New constructor
 */
Base.extend = function (proto) {
	return util.extendClass(this, proto);
};

module.exports = Base;