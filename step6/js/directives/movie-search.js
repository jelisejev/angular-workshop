angular.module('moviedb').directive('mdbMovieSearch', function(movies) {
    return {
        replace: true,
        templateUrl: 'js/directives/movie-search.html',
        scope: {
            onSelect: '&'
        },
        bindToController: true,
        controllerAs: 'search',
        controller: function() {
            // mock search results
            this.results = [];

            // search onchange handler
            this.search = function(query) {
                movies.search(query).then(function(response) {
                    this.results = response.results;
                }.bind(this));
            };

            // click handler
            this.select = function(movie) {
                this.results = [];
                this.onSelect({ movie: movie });
            }
        }
    }
});