var admin    = require ('./admin');
var file     = require ('../routes/fs');
var document = require ('../routes/document');
//@@
var queryMongo=require ('../routes/document');
var olap     = require ('../routes/olapRoute');
var graph    = require ('../routes/graph');
var messageQ = require ('../routes/message');
var socket   = require ('../routes/socket');
var viz      = require ('../routes/visualization');

/*
 * Collect all of the application's routes in one place.
 * Export these for use in the main application in a consolidated way.
 */

/**
 * Render the main page.
 */
exports.index = function (request, response) {
  response.render ('index', { title: 'LAS Event Service' });
};
exports.admin         = admin;
exports.document      = document;
//@@
exports.queryMongo    = queryMongo;
exports.olap          = olap;
exports.file          = file;
exports.graph         = graph;
exports.messageQ      = messageQ;
exports.socket        = socket;
exports.visualization = viz;
