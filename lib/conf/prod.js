/**
 * Application configuration data.
 */
var config = {
    /**
     * Port the server runs on.
     */
    port : 3000,

    /**
     * File storage configuration data.
     */
    file : {
        root : '/var/las/data/file'
    },
    /**
     * Document storage configuration data.
     */
    documentdb : {
        url : 'localhost:27017/test?auto_reconnect',
        defaultCollection : 'collection'
    },
    /**
     * Graph database configuration data.
     */
    graphdb : {
        url : 'http://localhost:7474'
    },

    clustered : true

};

module.exports = config;
