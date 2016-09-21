var rethink = require(__dirname + '/r.js');
var http = require('request');

const conf = require(__dirname + '/config.js');
const r = rethink.r;
const conn = rethink.conn;

var paragonHttpHeaders = {
    url: conf['paragon']['base_uri']+'/v1/cards/complete',
    headers: {
        'X-Epic-ApiKey': conf['paragon']['apiKey']
    }
};

function requestHandler(err, response, body, tableName) {
    if(!err && response.statusCode < 300) {
        console.log('Importing data for '+tableName);
        
        var data = JSON.parse(body);

        for(var index in data) {
            if (data.hasOwnProperty[index]) {
                var card = data[index];
                if(!r){ console.log('rethink not exists'); }
                r.table(tableName).insert(card).run(conn, function(error, res){
                    if(error) {
                        throw error;
                    }
                });
            }
        }

        console.log('Finished importing.');
    }
}

http.get(paragonHttpHeaders, function(error, response, body) {
    requestHandler(error, response, body, 'cards');
});

paragonHttpHeaders['url'] = conf['paragon']['base_uri']+'/v1/heroes/complete';

http.get(paragonHttpHeaders, function(err, response, body) {
    requestHandler(err, response, body, 'heroes');
});
