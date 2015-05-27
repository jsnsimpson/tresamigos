(function() {

    var app = angular.module('tresamigos', []);


    function AppController(GetFeaturesService) {

        this.currentFeatures = GetFeaturesService;
        // this.newFeatures = NewFeaturesService;

        this.getFeatures = function() {
            GetFeaturesService.getFeatures();
        };

        this.getFeatures();
    }

    app.controller('AppController', ['GetFeaturesService', AppController]);


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
    }
})();
