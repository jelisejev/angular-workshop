angular.module('moviedb')
    .factory('movies', function($resource, apiKey) {
        return {
            search: function(query) {
                return $resource('http://api.themoviedb.org/3/search/movie').get({
                    query: query,
                    api_key: apiKey
                }).$promise;
            },

            findById: function(id) {
                return $resource('http://api.themoviedb.org/3/movie/:id').get({
                    id: id,
                    api_key: apiKey
                }).$promise;
            }
        }
    });