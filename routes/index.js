var admin    = require ('./admin');
var file     = require ('../routes/fs');
var document = require ('../routes/document');
var druid    = require ('../routes/druid');
var graph    = require ('../routes/graph');
var messageQ = require ('../routes/messageQ');
var socket   = require ('../routes/socket');

/*
 * Collect all of the application's routes in one place.
 * Export these for use in the main application in a consolidated way.
 */

/**
 * Render the maing page.
 */
exports.index = function (request, response){
  response.render ('index',
		   { title: 'LAS Event Service' });
};
exports.admin    = admin;
exports.document = document;
exports.druid    = druid;
exports.file     = file;
exports.graph    = graph;
exports.messageQ = messageQ;
exports.socket   = socket;
