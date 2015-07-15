angular.module('moviedb')
    .controller('MainController', function() {
        // mock search results
        this.results = [
            { title: 'Game of Thrones' },
            { title: 'The Shining' },
            { title: 'Goodfellas' },
        ];

        // search onchange handler
        this.search = function(query) {
            console.log(query);
        };
    });