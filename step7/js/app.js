angular.module('moviedb', ['ngResource', 'ngRoute'])
    .constant('apiKey', '739c4bd0ee4c3bb16d622312d23d7b8a')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'js/controllers/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }).
          when('/movie/:movieId', {
            templateUrl: 'js/controllers/movie.html',
            controller: 'MovieController',
            controllerAs: 'vm'
          }).
          otherwise({
            redirectTo: '/'
          });
      }]);