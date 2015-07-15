angular.module('moviedb').directive('mdbMovie', function() {
    return {
        replace: true,
        templateUrl: 'js/directives/movie.html',
        scope: {
            movie: '='
        },
        bindToController: true,
        controllerAs: 'vm'
    }
});