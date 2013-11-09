
var admin = require ('./admin');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'LAS Instrumentation - Event Service' });
};

exports.admin = admin.index;
