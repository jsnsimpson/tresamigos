
var fs = require('fs');
var path = require('path');
var FeatureParser = require('./src/FeatureParser');

var featureLocation = process.argv[2];

var fileExtension = '.feature';



if(!featureLocation) {
    console.log('argument 1 must be the folder containing .feature files');
    process.exit(1);
} else {
    featureLocation = __dirname + '/' + featureLocation;
}

var features = {
    givens: [],
    whens: [],
    thens: []
};

var fileReader = function(err, files) {
    if(err) {
        throw err;
    }

    files.forEach(function(file) {
        var extension = path.extname(file);

        if(extension === fileExtension) {

            var feature = new FeatureParser(featureLocation + file);

            feature.givens.forEach(function(given) {
                if(features.givens.indexOf(given) === -1) {
                    features.givens.push(given);
                }
            });
            feature.whens.forEach(function(when) {
                if(features.whens.indexOf(when) === -1) {
                    features.whens.push(when);  
                }
            });
            feature.thens.forEach(function(then) {
                if(features.thens.indexOf(then) === -1) {
                    features.thens.push(then);
                }
            });

        }
    });

    fs.writeFile(__dirname + '/out/features.json', JSON.stringify(features), function() {
        console.log(JSON.stringify(features, null, 2));
    });
};


//init
fs.readdir(featureLocation, fileReader);
