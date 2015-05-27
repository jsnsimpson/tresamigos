
var express = require('express');
var fs = require('fs');
var app = express();

var PORT = 2563;

app.use('/', express.static(__dirname  + '/client'));
app.use('/lib', express.static(__dirname  + '/node_modules'));

app.get('/features', function(req, res) {

    var file = fs.readFileSync(__dirname + '/out/features.json', {
        encoding: 'utf8'
    });

    res.json(JSON.parse(file));
});

app.listen(PORT, function() {
    console.log('express server listening on port: ' + PORT);
});
