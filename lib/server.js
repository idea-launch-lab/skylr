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
var express = require('express');
var swig = require('swig');
var expressValidator = require ('express-validator');
var socketIO = require ('socket.io');
var RedisStore = require ('socket.io/lib/stores/redis');
var redis  = require ('socket.io/node_modules/redis');
var mongoose = require ('mongoose');

/**
 * ================================================================
 * == Application
 * ================================================================
 */
var core = require ('./core');
var routes = require ('../routes');
var fileSystem = require('../routes/fs');
var document = require('../routes/document');
var graph = require('../routes/graph');
var socket = require('../routes/socket');

var logger = core.logging.getLogger ('server');

var app = express ();
var port = process.env.NODE_PORT || core.config.port;
 
/**
 * ================================================================
 * == Swig
 * ================================================================
 */
swig.setDefaults({ cache: app.get('env') === 'production' });

/**
 * ================================================================
 * == Express
 * ================================================================
 */
app.set('port', port);
app.set('views', __dirname + '/../views');
app.set('view cache', app.get('env') === 'production');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
 
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser ({ keepExtensions: true, uploadDir: "uploads" }));
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/../public')));

// generic error handler.
app.use (function (err, req, res, next) {
    logger.error (err);
    next (err);
});
app.use (function (err, req, res, next) {
    console.error (err.stack);
    res.send (500, 'System error.');
    next (err);
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get  ('/', routes.index);
app.get  ('/api/admin/app/find', routes.admin.findApps);
app.post ('/api/admin/app/create', routes.admin.createApp);
app.post ('/api/data/file/add', fileSystem.add);
app.post ('/api/data/graph/add', graph.add);
app.post ('/api/data/document/add', document.add);

/**
 * ================================================================
 * == Mongoose
 * ================================================================
 */
mongoose.connect ('mongodb://localhost/test');
var db = mongoose.connection;
db.on ('error', console.error.bind(console, 'connection error:'));
db.once ('open', function callback () {
});

/**
 * ================================================================
 * == Create server
 * ================================================================
 */
this.server = http.createServer (app);
this.app = app;

module.exports.listen = function () {
    this.server.listen (port,  function () {
        logger.info ('System listening on port ' + port + '.');
    });
};

module.exports.close = function (callback) {
    this.server.close (callback);
};

/**
 * ================================================================
 * == Socket IO
 * == https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
 * ================================================================
 */
var io = socketIO.listen (this.server, { log : false });
console.log ("env> " + app.get ('env'));
console.log ("clustered> " + core.config.clustered);
if (core.config.clustered) {
    var pub = redis.createClient ();
    var sub = redis.createClient ();
    var client = redis.createClient ();
    io.set ('store', new RedisStore({
	redisPub : pub
	, redisSub : sub
	, redisClient : client
    }));
}
io.sockets.on('connection', socket);
