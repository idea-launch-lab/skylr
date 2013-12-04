var fs      = require ('fs');
var request = require ('request');
var core    = require ('./core');

/**
 * Post content - i.e. name value pairs.
 */
exports.post = function (args, handler) {
    request.post (args, handler);
};

/**
 * Post data - i.e. multi-part encoded form data.
 *@param uri The URI of the service to post to.
 *@param filePath The path to a local file to post to the server.
 *@param fileParam The name of the file parameter.
 *@param handler The handler to use on completion.
 */
exports.postFile = function (uri, filePath, fileParam, handler) {
    var req = request.post (uri, handler);
    var form = req.form ();
    form.append (fileParam, fs.createReadStream (filePath));  
};
