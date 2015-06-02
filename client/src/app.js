(function() {

    var app = angular.module('tresamigos', []);


    function AppController(GetFeaturesService, NewFeaturesService) {

        this.currentFeatures = GetFeaturesService;
        this.newFeatures = NewFeaturesService;

        this.showGivens = true;
        this.showWhens = false;
        this.showThens = false;

        this.getFeatures = function() {
            GetFeaturesService.getFeatures();
        };

        this.addStep = function(step) {
            NewFeaturesService.addStep(step)
        };

        this.clearNew = function() {
            NewFeaturesService.clearFeature();
        };

        this.createStep = function(step, type) {


            if(step.toLowerCase().indexOf(type) !== 0) {
                step = type[0].toUpperCase() + type.slice(1, type.length) + ' ' + step;
            }
            var newStep = {
                step: step,
                type: type
            };
            GetFeaturesService[type + 's'].unshift(newStep);
            this.addStep(newStep);
        };

        this.createWhenStep = function(step) {
            if(step.indexOf('When') !== 0) {
                step = 'When ' + step;
            }
            var newStep = {
                step: step,
                type: 'when'
            };
            GetFeaturesService.whens.unshift(newStep);
            this.addStep(newStep);
        };

        this.createThenStep = function(step) {
            if(step.indexOf('Then') !== 0) {
                step = 'Then ' + step;
            }
            var newStep = {
                step: step,
                type: 'then'
            }
            GetFeaturesService.thens.unshift(newStep);
            this.addStep(newStep);
        };

        this.getFeatures();
    }

    app.controller('AppController', ['GetFeaturesService', 'NewFeaturesService', AppController]);


    function GetFeaturesService($http) {

        this.givens = [];
        this.whens = [];
        this.thens = [];

        var that = this;

        /**
         * Geat the features
         */
        this.getFeatures = function() {
            return $http.get('/features').then(function(response) {
                that.givens = response.data.givens;
                that.whens = response.data.whens;
                that.thens = response.data.thens;
                return response.data;
            });
        };
    }

    app.factory('GetFeaturesService', ['$http', function($http) {
        var service = new GetFeaturesService($http);
        return service;
    }]);

    function NewFeaturesService($http) {
        this.givens = [];
        this.whens = [];
        this.thens = [];

        var that = this;

        this.submitFeature = function() {
            //$http.post('/features').then(function() {});
        };

        this.clearFeature = function() {
            that.givens = [];
            that.whens = [];
            that.thens = [];
        };

        this.addStep = function(step) {
            var newStep = JSON.parse(JSON.stringify(step));
            var type = step.type + 's';
            if(that[type].length > 0) {
                newStep.step = 'And' + newStep.step.slice(newStep.type.length, newStep.step.length);
            }
            that[step.type + 's'].push(newStep);
        };
    }

    app.factory('NewFeaturesService', ['$http', function($http) {
        var newFeatures = new NewFeaturesService($http);
        return newFeatures;
    }]);
})();
