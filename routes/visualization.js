var core = require ('../lib/core');
var logger = core.logging.getLogger ('visualization_route');

/*
 * Controllers for visualization functions.
 */

// Render a sunburst.
exports.sunburst = function (request, response) {
    response.render ('viz/sunburst.html', { title: 'Sunburst' });
};
