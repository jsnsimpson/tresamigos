
var fs = require('fs');
var LineByLine = require('line-by-line');

function FeatureParser(fileLocation) {

    this.fullFile = '';
    this.lines = [];

    this.givens = [];
    this.whens = [];
    this.thens = [];

    var andPusher = '';
    var that = this;

    this.parseFeature = function(data) {
        this.fullFile = data;
        this.lines = that.fullFile.split('\n');

        that.lines.forEach(this.parseLine);
    };

    this.parseLine = function(line) {
        line = line.replace(/\s/g, ' ').trim();
        var firstWord = line.split(' ')[0];


        switch(firstWord) {
            case 'Given':
                this.givens.push(line);
                andPusher = 'givens';
                break;
            case 'When':
                this.whens.push(line);
                andPusher = 'whens';
                break;
            case 'Then':
                this.thens.push(line);
                andPusher = 'thens';
                break;
            case 'And':
                var newKeyword = andPusher[0].toUpperCase() + andPusher.slice(1, andPusher.length-1);
                var correctLine = line.replace('And', (newKeyword));
                
                this[andPusher].push(correctLine);
                break;
        }
    }.bind(this);

    var file = fs.readFileSync(fileLocation, {
        encoding: 'utf8'
    });
    this.parseFeature(file);
}


module.exports = FeatureParser;
