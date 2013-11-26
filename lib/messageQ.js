var core = require ('./core');
var Producer = require ('Prozess').Producer;

var logger = core.logging.getLogger ('');

var producer = new Producer (core.config.kafka.topic,
			     {
				 host : core.config.kafka.host
			     });
producer.connect ();

logger.info ("Producing messages for ", producer.topic);
producer.on ('error', function (err) {
    logger.info ("General error occurred: ", err);  
});

producer.on ('brokerReconnectError', function (err) {
    logger.info ("Could not reconnect: ", err);
    logger.info ("Will retry on next send()");
});

module.exports = {
    send : function (text, callback) {
	producer.send (text, callback);
    }
};


