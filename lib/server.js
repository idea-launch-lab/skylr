/**
 * neo4j   : https://github.com/thingdom/node-neo4j
 * reslter : https://github.com/danwrong/restler
 *
 * http://journal.paul.querna.org/articles/2011/12/18/the-switch-python-to-node-js/
 */
var express = require('express');
var routes = require('../routes');
var http = require('http');
var path = require('path');
var expressValidator = require ('express-validator');
var socketIO = require ('socket.io');
var RedisStore = require ('socket.io/lib/stores/redis')
, redis  = require ('socket.io/node_modules/redis');

var core = require ('./core');
var fileSystem = require('../routes/fs');
var document = require('../routes/document');
var graph = require('../routes/graph');
var socket = require('../routes/socket');
var logger = core.logging.getLogger ('server');

var app = express ();
var swig = require('swig');
var port = process.env.PORT || core.config.port;

swig.setDefaults({ cache: app.get('env') === 'production' });

// all environments
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

app.get('/', routes.index);
app.get('/admin', routes.admin);
app.post ('/file/add', fileSystem.add);
app.post ('/graph/add', graph.add);
app.post ('/document/add', document.add);

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

// Socket.io Communication
// https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
var io = socketIO.listen (this.server);
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
