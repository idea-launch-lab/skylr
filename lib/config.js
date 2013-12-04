var path = require ('path');

function ifvar (v, val) {
    var result = null;
    if (v === undefined || v === null) {
	result = val;
    } else {
	result = v;
    }
    return result;
}

var cacheTemplates = false;
if (process.env.NODE_ENV === 'prod') {
    cacheTemplates = 'memory';
}

var GIGABYTE = Math.pow (1024, 3);

/**
 * Application configuration data.
 */
var config = {

    /**
     * Port the server runs on.
     */
    service : {
	port                   : ifvar (process.env.NODE_PORT, 3000),
	cacheTemplates         : cacheTemplates,
	useExpressErrorHandler : process.env.NODE_ENV !== 'prod',
	clustered              : ( process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'dev' ),
	// Directory data files will be saved to.
	uploadPath             : path.normalize (path.join (__dirname, '..', 'data')),
	maxUploadSize          : 10 * GIGABYTE
    },

    /**
     * File storage configuration data.
     */
    file : {
        root : ifvar (process.env.NODE_DATA, 'data')
    },

    /**
     * Document storage configuration data.
     */
    documentdb : {
        url : 'localhost:' + ifvar (process.env.MONGO_PORT, 27017) + '/test?auto_reconnect',
        defaultCollection : 'collection'
    },

    /**
     * Graph database configuration data.
     */
    graphdb : {
        url : 'http://localhost:' + ifvar (process.env.NEO4J_PORT, 7474)
    },

    /**
     * Kafka
     */
    kafka : {
	host  : 'localhost',
	topic : 'druidtest'
    },

    /**
     * Druid URL
     */
    druid : {
	URI : 'http://localhost:' + ifvar (process.env.DRUID_PORT, 8083) + '/druid/v2/?pretty'
    }

};

module.exports = config;
