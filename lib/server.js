/**
 * ================================================================
 * ==
 * == This file configures and initiates the system's services.
 * == These include:
 * ==   - Web User Interface:
 * ==       o Express - the model/view/controller web framework
 * ==       o Swig - template engine
 * ==   - API
 * ==       p Configures Express routes to API implementations
 * ==       o APIs are: Admin, Data, Analytics
 * ==   - Asynchronous Notification Engine
 * ==       o Socket.io - HTML5 websockets implementation
 * ==       o Redis - for socket.io in clustered environments
 * ==
 * ================================================================
 */

/**
 * ================================================================
 * == Node Core
 * ================================================================
 */
var http = require ('http');
var path = require ('path');

/**
 * ================================================================
 * == External
 * ================================================================
 */
var express          = require ('express');
var swig             = require ('swig');
var expressValidator = require ('express-validator');
var socketIO         = require ('socket.io');
var RedisStore       = require ('socket.io/lib/stores/redis');
var redis            = require ('socket.io/node_modules/redis');
var socketIOClient   = require ('socket.io-client');

/**
 * ================================================================
 * == Load application components.
 * ================================================================
 */
var core = require ('./core');
var routes = require ('../routes');

var logger = core.logging.getLogger ('server');
var port = core.config.service.port;
port = 3000;

/**
 * ================================================================
 * == Error handler of last resort.
 * ================================================================
 */
process.on ('uncaughtException', function (err) {
    var message = 'Unhandled Exception: ' + err;
    logger.error ("-->[ " + message + " ]");
    var fatal = message.indexOf ('ECONNREFUSED') == -1;
    if (fatal) {
	console.log ( err.stack );
	process.exit (1);
    }
});
 
/**
 * ================================================================
 * == Swig - template rendering engine.
 * ================================================================
 */
swig.setDefaults ({ cache: core.config.service.cacheTemplates });

/**
 * ================================================================
 * == Express - model view controller web framework.
 * ================================================================
 */
var app = express ();
app.set ('port', port);
app.set ('views', __dirname + '/../views');
app.set ('view cache', core.config.service.cacheTemplates);
app.set ('view engine', 'html');
app.engine ('html', swig.renderFile);
 
app.use (express.favicon ());
app.use (express.logger ('dev'));
app.use (express.bodyParser ({
    keepExtensions: true,
    uploadDir: core.config.service.uploadPath
}));
app.use (expressValidator ());
app.use (express.methodOverride ());
app.use (express.cookieParser ('your secret here'));
app.use (express.session ());
app.use (app.router);
app.use (express.static (path.join(__dirname, '/../public')));
app.use (function (err, req, res, next) {
    res.send (500, 'error');
    next (err);
});

/**
 * ================================================================
 * == Configure Express routes.
 * ================================================================
 */

// Administrative API
app.get  ('/',                      routes.index);
app.get  ('/api/admin/app/find',    routes.admin.findApps);
app.post ('/api/admin/app/create',  routes.admin.createApp);
app.post ('/api/admin/app/delete',  routes.admin.deleteApp);

// Storage API
app.post ('/api/data/file/add',       routes.file.add);
app.post ('/api/data/file/addBinary', routes.file.addBinary);
app.post ('/api/data/messageQ/add',   routes.messageQ.add);
app.post ('/api/data/document/add',   routes.document.add);
//@@
app.post ('/api/data/document/queryMongo', routes.document.queryMongo);

app.post ('/api/data/graph/add',      routes.graph.add);

// Analytics API
app.post ('/api/data/olap/query',    routes.olap.query);
app.get  ('/analytics/viz/sunburst', routes.visualization.sunburst);

/**
 * ================================================================
 * == Create server
 * ================================================================
 */ 
this.server = http.createServer (app);
this.app = app;

module.exports.listen = function () {
    this.server.listen (port,  function () {
        logger.info ('Listening @ port ' + port + '.');
    });
};
module.exports.close = function (callback) {
    try {
	this.server.close (callback);
    } catch (e) {
	logger.info ('server closed');
    }
};

/**
 * ================================================================
 * == Socket IO
 * == https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
 * == integrating socket.io and express: http://www.danielbaulig.de/socket-ioexpress/
 * ================================================================
 */
var io = socketIO.listen (this.server, { log : false });
logger.info ("environment > %s", app.get ('env'));
logger.info ("     config > " + core.util.inspect (core.config));
if (core.config.service.clustered) {
    var pub = redis.createClient ();
    var sub = redis.createClient ();
    var client = redis.createClient ();
    io.set ('store', new RedisStore ({
	redisPub : pub
	, redisSub : sub
	, redisClient : client
    }));
}
io.sockets.on ('connection', routes.socket);

var socketIOClientOptions = {
  transports: [ 'websocket' ],
  'force new connection': true
};
var socketIOURL = "http://0.0.0.0:" + port;
var sioClient = socketIOClient.connect (socketIOURL);

