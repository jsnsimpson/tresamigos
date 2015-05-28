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
            that[step.type + 's'].push(step);
        };
    }

    app.factory('NewFeaturesService', ['$http', function($http) {
        var newFeatures = new NewFeaturesService($http);
        return newFeatures;
    }]);
})();
