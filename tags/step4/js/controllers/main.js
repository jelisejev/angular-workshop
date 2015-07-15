angular.module('moviedb')
    .controller('MainController', function($resource) {
        this.results = [];
        this.movie = null;

        // search onchange handler
        this.search = function(query) {
            var promise = $resource('http://api.themoviedb.org/3/search/movie').get({
                query: query,
                api_key: '739c4bd0ee4c3bb16d622312d23d7b8a'
            }).$promise;

            promise.then(function(response) {
                this.results = response.results;
            }.bind(this));
        };

        // click handler
        this.select = function(movie) {
            this.movie = movie;
            this.results = [];
        };
    });