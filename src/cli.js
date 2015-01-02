// set process title
process.title = 'obvious';

// parse command line options
var docopt = require('docopt').docopt;
var fs = require('fs');
var USAGE = fs.readFileSync(__dirname + '/../USAGE', 'utf-8');
var options = docopt(USAGE, {
	help: true,
	version: require('../package.json').version
});

// initialize
var obvious = require('./');
obvious({
	screen: options['--screen'],
	interval: Number(options['--interval'])
});