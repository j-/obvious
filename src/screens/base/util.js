var hasProperty = function (obj, property) {
	return Object.prototype.hasOwnProperty.call(obj, property);
};

/**
 * Insert a superconstructor into the prototype chain for a constructor
 * @param {Function} Child Constructor function
 * @param {Function} Parent Superconstructor function
 */
var inherits = function (Child, Parent) {
	// from backbone. surrogate class.
	var Class = function () {
		this.constructor = Child;
	};
	Class.prototype = Parent.prototype;
	Child.prototype = new Class();
	Child.__super__ = Parent.prototype;
};

/**
 * Takes a superconstructor and returns a child constructor with its
 *   prototype extended
 * @param {Function} Parent Superconstructor function
 * @param {Object=} proto Prototype object
 * @return {Function} Child constructor function
 */
var extendClass = function (Parent, proto) {
	var name, value;
	// sub class
	var Child = proto && hasProperty(proto, 'constructor') ?
		proto.constructor :
		function () {
			return Parent.apply(this, arguments);
		};
	inherits(Child, Parent);
	// copy static properties from super class to sub class
	for (name in Parent) {
		if (hasProperty(Parent, name)) {
			Child[name] = Parent[name];
		}
	}
	// copy prototype from super class to sub class
	for (name in proto) {
		if (hasProperty(proto, name)) {
			value = proto[name];
			Child.prototype[name] = value;
		}
	}
	return Child;
};

module.exports = {
	hasProperty: hasProperty,
	inherits: inherits,
	extendClass: extendClass
};