angular.module('moviedb')
    .controller('MainController', function(movies) {
        this.results = [];

        // search onchange handler
        this.search = function(query) {
            movies.search(query).then(function(response) {
                this.results = response.results;
            }.bind(this));
        };

        // click handler
        this.select = function(movie) {
            this.movie = movie;
            this.results = [];
        };
    });