/**
 * Application configuration data.
 */
var config = {
    /**
     * Port the server runs on.
     */
    port : process.env.NODE_PORT,

    /**
     * File storage configuration data.
     */
    file : {
        root : 'data'
    },
    /**
     * Document storage configuration data.
     */
    documentdb : {
        url : 'localhost:' + process.env.MONGO_PORT + '/test?auto_reconnect',
        defaultCollection : 'collection'
    },
    /**
     * Graph database configuration data.
     */
    graphdb : {
        url : 'http://localhost:' + process.env.NEO4J_PORT
    },

    clustered : 'true' == process.env.NODE_CLUSTERED

};

module.exports = config;
