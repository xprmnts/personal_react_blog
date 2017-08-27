
if (process.env.NODE_ENV === 'production') {
	// return prod keys
	module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'staging'){
	// return staging keys
  module.exports = require('./staging');
} else {
  // return dev keys
  module.exports = require('./dev');
}