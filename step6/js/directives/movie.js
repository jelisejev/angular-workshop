angular.module('moviedb').directive('mdbMovie', function(movies) {
    return {
        replace: true,
        templateUrl: 'js/directives/movie.html',
        scope: {
            movie: '='
        },
        bindToController: true,
        controllerAs: 'mv',
        controller: function() {}
    }
});