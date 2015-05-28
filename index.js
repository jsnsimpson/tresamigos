
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
    var featureSteps = JSON.parse(file);

    var currentFeatures = {
    	givens: [],
    	whens: [],
    	thens: []
    };

    featureSteps.givens.forEach(function(step) {
    	currentFeatures.givens.push({
    		step: step,
    		type: 'given'
    	});
    });

    featureSteps.whens.forEach(function(step) {
    	currentFeatures.whens.push({
    		step: step,
    		type: 'when'
    	});
    });

    featureSteps.thens.forEach(function(step) {
    	currentFeatures.thens.push({
    		step: step,
    		type: 'then'
    	});
    });

    res.json(currentFeatures);
});

app.listen(PORT, function() {
    console.log('express server listening on port: ' + PORT);
});
