var neo4j = require('neo4j');

/*
 * GET users listing.
 */

exports.list = function (req, res) {
    
    var db = new neo4j.GraphDatabase ('http://localhost:7474');
    var node = db.createNode ({hello: 'world'});     // instantaneous, but...
    node.save (function (err, node) {    // ...this is what actually persists.
	if (err) {
            console.err('Error saving new node to database:', err);
	    res.send ('error');
	} else {
            console.log('Node saved to database with id:', node.id);
	    res.send ('saved ' + node.id);
	}
    });

    //res.send("respond with a resource of some kind");
};
