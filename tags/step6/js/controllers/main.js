angular.module('moviedb')
    .controller('MainController', function(movies) {
        // click handler
        this.select = function(movie) {
            this.movie = movie;
        };
    });