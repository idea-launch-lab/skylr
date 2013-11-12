var winston = require ('winston');

/**
 * Configure per module logging settings
 */
winston.loggers.add ('api', {
    console: {
	level    : 'debug', //'info',
	colorize : 'true'
    },
    file: {
	filename: '/path/to/some/file'
    }
});

module.exports = {
    getLogger : function (name) {
	return new winston.Logger ({
            transports: [
		new (winston.transports.Console) ({ timestamp : true })
            ]
	});
    }
};
