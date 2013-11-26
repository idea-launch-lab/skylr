var winston = require ('winston');
var events = require ('events');

//events.EventEmitter.setMaxListeners (20);

/**
 * Configure per module logging settings
 */
var loggers = {
    'app' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'app'
	}
    },
    'core' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'core'
	}
    },
    'mongodb' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'mongodb'
	}
    },
    'socket.io' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'socket.io'
	}
    },
    'file-db' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'file-db'
	}
    },
    'graph-db' : {
	console: {
	    level    : 'debug',
	    colorize : 'true',
	    label    : 'graph-db'
	}
    }
};

/*
for (var k in loggers) {
    var logger = loggers [k];
    winston.loggers.add (k, loggers [k]);
}
*/

var defaultLogLevel = 'debug';

module.exports = {
    setLogLevel : function (logLevel) {
	if (logLevel !== null) { // && logLevel !== undefined) {
	    defaultLogLevel = logLevel;
	}
    },
    getLogger : function (name) {
	var logger = null; //winston.loggers.get (name);
	if (logger === null || logger === undefined) {
	    logger = new winston.Logger ({
		transports: [
		    new (winston.transports.Console) ({
			level     : defaultLogLevel, //'debug', //'error',
			colorize  : true,
			label     : name,
			timestamp : true,
			prettyPrint : true
		    })
		]
	    });
	}
	return logger;
    }
};
 
