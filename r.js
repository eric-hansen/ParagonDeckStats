var config = require(__dirname + '/config.js');
var r = require('rethinkdb');

var conn = null;

r.connect(config['rethinkdb'], function(err, connection){
    if (err) { throw err; }

    conn = connection;
});

module.exports = {
    'r': r,
    'conn': conn
};