angular.module('moviedb')
    .controller('MovieController', function(movies, $routeParams) {
        movies.findById($routeParams.movieId).then(function(movie) {
            this.movie = movie;
        }.bind(this));
    });