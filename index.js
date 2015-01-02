// if executed directly
if (require.main === module) {
	require('./src/cli');
}

// otherwise, if included via require()
else {
	module.exports = require('./src');
}