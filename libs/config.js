var nconf = require('nconf');

nconf
	.argv()
	.env()
	.file({
		file: process.cwd() + '/config.json'
	})
	.defaults(
		{
			
		}
	);

module.exports = nconf;