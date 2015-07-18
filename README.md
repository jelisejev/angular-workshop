# Movie search application using Angular JS

This simple step-by-step guide will demonstrate how Angular JS can be used to create dynamic single page applications.

## Environment setup

Download and install node from https://nodejs.org/download/.

Use npm to install bower.
```
npm install -g bower
```
Install a basic node http server.
```
npm install -g http-server
```

## Running the app
Download the project either using git or [as an archive](https://github.com/jelisejev/angular-workshop/archive/master.zip)
```
git clone https://github.com/jelisejev/angular-workshop.git
```
Switch to the project folder and run the server.
```
cd angular-workshop
http-server
```

The application should be available at http://0.0.0.0:8080/app.

## About the API

For this example we'll use the movie database API provided by themoviedb.org. Detailed information about the API is [available here](http://docs.themoviedb.apiary.io/).

Two methods are used in this workshop: [/search/movie](http://docs.themoviedb.apiary.io/#reference/search/searchmovie/get) and [/movie/:id](http://docs.themoviedb.apiary.io/#reference/movies/movieid/get).

The API endpoint is http://api.themoviedb.org/3/. The following API key can be used during the workshop `739c4bd0ee4c3bb16d622312d23d7b8a`.

## Step-by-step guide

The following guide contains step-by-step instructions on how to recreate this app. The guide is divided into multiple steps, each focusing on its own aspect of Angular JS. In case you get stuck at some point or you'll wish to fast-forward ahead, the final results of each step is available in the `tags` folder.

### Step 1. Initial markup and styles

The result of step 1 is already available in the `app` folder. It contains the basic HTML markup and CSS styles that will be used in the project.

It contains two files:

`index.html`
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <title></title>
</head>
<body>
    <div class="search">
        <input placeholder="Search">
        <ul class="results">
            <li>Result 1</li>
            <li>Result 2</li>
            <li>Result 3</li>
        </ul>
    </div>
</body>
</html>
```

and `styles.css`
```css
.search {
    display: block;
    margin: auto;
    width: 400px;
}

.search input {
    font-size: 16px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.search .results {
    list-style-type: none;
    width: 400px;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    z-index: 10;
    background: white;
}

.search .results li {
    margin: 0;
    border: 1px solid #ccc;
    border-top: 0;
    padding: 10px;
}

.search .results li:hover {
    background: #DCEFFC;
}
```

### Step 2. Bootstrapping Angular JS

In this step we'll add Angular JS to our application.

First of all, create a bower.json file and install Angular using bower.
```
bower init
bower install angular --save
```

Create the folders to contain our JS files: `js` and `js/controllers`.

Create an Angular module definition file and save it to `js/app.js`.
```js
angular.module('moviedb', []);
```

Create a basic controller with some mock data and save it as `js/controllers/main.js`.
```js
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
```

Update the `index.html` file to include the newly created files and implement the Angular app.
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <title></title>
</head>
<body ng-app="moviedb" ng-controller="MainController as vm">
    <div class="search">
        <input placeholder="Search" ng-model="vm.query" ng-change="vm.search(vm.query)">
        <ul class="results">
            <li ng-repeat="result in vm.results">{{result.title}}</li>
        </ul>
    </div>
</body>
</html>
```

### Step 3. Working with the API

In this step we'll intergrate our Angular app with the remote API using the $resource service.

First of all, you'll need to install the `ng-resource` module using bower.

```
bower install angular-resource --save
```

After that, declare the module as a dependency of your all in ``app.js``
```
angular.module('moviedb', ['ngResource']);
```

And include it in `index.html`
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <title></title>
</head>
<body ng-app="moviedb" ng-controller="MainController as vm">
    <div class="search">
        <input placeholder="Search" ng-model="vm.query" ng-change="vm.search(vm.query)">
        <ul class="results">
            <li ng-repeat="result in vm.results">{{result.title}}</li>
        </ul>
    </div>
</body>
</html>
```

Finally, update `main.js` to request the movie list from the API.
```js
angular.module('moviedb')
    .controller('MainController', function($resource) {
        this.results = [];

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
    });
```

### Step 4. Implementing movie selection

In this step we'll use the accuired knowledge to implement the ability to properly select movies. 

Update `main.js` to define a `movie` binding and a `select` handler.

```js
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
```

Update the markup in `index.html` to include the movie block.

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <title></title>
</head>
<body ng-app="moviedb" ng-controller="MainController as vm">
    <div class="search">
        <input placeholder="Search" ng-model="vm.query" ng-change="vm.search(vm.query)">
        <ul class="results">
            <li ng-repeat="result in vm.results" ng-click="vm.select(result)">{{result.title}}</li>
        </ul>
    </div>
    <div class="movie" ng-if="vm.movie">
        <h2>{{vm.movie.title}}</h2>
        <p>{{vm.movie.overview}}</p>
    </div>
</body>
</html>
```

As a finishing touch update `styles.css`.

```css
.search {
    display: block;
    margin: auto;
    width: 400px;
}

.search input {
    font-size: 16px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.search .results {
    list-style-type: none;
    width: 400px;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    z-index: 10;
    background: white;
}

.search .results li {
    margin: 0;
    border: 1px solid #ccc;
    border-top: 0;
    padding: 10px;
}

.search .results li:hover {
    background: #DCEFFC;
}

.movie {
    width: 600px;
    margin: 50px auto 0 auto;
}
```

### Step 5. Creating a custom service

During this step we will not add any additional functionality, but rather see how we can improve the code using Angular services.

First of all, create a new `movies` service and save it under `js/services/movies.js`

```js
angular.module('moviedb')
    .factory('movies', function($resource, apiKey) {
        return {
            search: function(query) {
                return $resource('http://api.themoviedb.org/3/search/movie').get({
                    query: query,
                    api_key: apiKey
                }).$promise;
            }
        }
    });
```

Add it to `index.html`.
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <script src="js/services/movies.js"></script>
    <title></title>
</head>
<body ng-app="moviedb" ng-controller="MainController as vm">
    <div class="search">
        <input placeholder="Search" ng-model="vm.query" ng-change="vm.search(vm.query)">
        <ul class="results">
            <li ng-repeat="result in vm.results" ng-click="vm.select(result)">{{result.title}}</li>
        </ul>
    </div>
    <div class="movie" ng-if="vm.movie">
        <h2>{{vm.movie.title}}</h2>
        <p>{{vm.movie.overview}}</p>
    </div>
</body>
</html>
```

Move the API key into `app.js` to be later injected where necessary.
```js
angular.module('moviedb', ['ngResource'])
    .constant('apiKey', '739c4bd0ee4c3bb16d622312d23d7b8a');
```

Update `main.js` to use the `movie` service instead of `$resource` directly.

```js
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
```

### Step 6. Using Angular directives

In this step we will refactor the existing code by adding custom HTML components called directives. We'll implement two directives: ``movie`` and ``movie-search``.

First, lets implement the 'movie' directive. Define the directive and save it under `js/directives/movie.js`.
```js
angular.module('moviedb').directive('mdbMovie', function(movies) {
    return {
        replace: true,
        templateUrl: 'js/directives/movie.html',
        scope: {
            movie: '='
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: function() {}
    }
});
```

Create a template for it and save it as `js/directives/movie.html`.
```html
<div class="movie">
    <h2>{{vm.movie.title}}</h2>
    <p>{{vm.movie.overview}}</p>
</div>
```

Define the `movie-search` directive and save it as `js/directives/movie-search.js`.
```js
angular.module('moviedb').directive('mdbMovieSearch', function(movies) {
    return {
        replace: true,
        templateUrl: 'js/directives/movie-search.html',
        scope: {
            onSelect: '&'
        },
        bindToController: true,
        controllerAs: 'vm',
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
```

And create a template for it in `js/directives/movie-search.js`.
```html
<div class="search">
    <input placeholder="Search" ng-model="vm.query" ng-change="vm.search(vm.query)">
    <ul class="results">
        <li ng-repeat="result in vm.results" ng-click="vm.select(result)">{{result.title}}</li>
    </ul>
</div>
```

Include the directives in `index.html`.
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <script src="js/services/movies.js"></script>
    <script src="js/directives/movie-search.js"></script>
    <script src="js/directives/movie.js"></script>
    <title></title>
</head>
<body ng-app="moviedb" ng-controller="MainController as vm">
    <mdb-movie-search on-select="vm.select(movie)"></mdb-movie-search>
    <mdb-movie movie="vm.movie" ng-if="vm.movie"></mdb-movie>
</body>
</html>
```

Remove all of the logic that has been implemented in the directives from `main.js`.
```js
angular.module('moviedb')
    .controller('MainController', function(movies) {
        // click handler
        this.select = function(movie) {
            this.movie = movie;
        };
    });
```

### Step 7. Routing

In this final step we'll implement basic routing and turn our project into a complete single page app.

Routing is implemented using the ``ng-route`` module so we need to install it.
```
bower install angular-route --save
```

Define the routes in 'app.js'.
```js
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
```

Update the `movie-search` directive in `movie-search.js` to navigate to a link instead of triggering a callback.
```js
angular.module('moviedb').directive('mdbMovieSearch', function(movies, $location) {
    return {
        replace: true,
        templateUrl: 'js/directives/movie-search.html',
        scope: {
        },
        bindToController: true,
        controllerAs: 'vm',
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

                $location.path('/movie/' + movie.id);
            }
        }
    }
});
```

Remove the callback from `main.js`.
```js
angular.module('moviedb')
    .controller('MainController', function() {
});
```

Add a template for the `main` controller and save it as `js/controllers/main.html`.
```html
<h1>Movie Database</h1>
<mdb-movie-search></mdb-movie-search>
```

Update the styles for it in `styles.css`.
```css
.search {
    display: block;
    margin: auto;
    width: 400px;
}

.search input {
    font-size: 16px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.search .results {
    list-style-type: none;
    width: 400px;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    z-index: 10;
    background: white;
}

.search .results li {
    margin: 0;
    border: 1px solid #ccc;
    border-top: 0;
    padding: 10px;
}

.search .results li:hover {
    background: #DCEFFC;
}

.movie {
    width: 600px;
    margin: 50px auto 0 auto;
}

h1 {
    text-align: center;
    margin-top: 100px;
}
```

Implement a `findById` method in the `movie` service to allow searching for specific movies.
```js
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
```

Add a new 'movie' controller and save it as `js/controllers/movie.js`.
```js
angular.module('moviedb')
    .controller('MovieController', function(movies, $routeParams) {
        movies.findById($routeParams.movieId).then(function(movie) {
            this.movie = movie;
        }.bind(this));
    });
```

Add a template for it under `js/controllers/movie.html`.
```html
<mdb-movie-search></mdb-movie-search>
<mdb-movie movie="vm.movie" ng-if="vm.movie"></mdb-movie>
```

Finally, update `index.html` to include the new files and the view placeholder.
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers/main.js"></script>
    <script src="js/controllers/movie.js"></script>
    <script src="js/services/movies.js"></script>
    <script src="js/directives/movie-search.js"></script>
    <script src="js/directives/movie.js"></script>
    <title></title>
</head>
<body ng-app="moviedb">
    <div ng-view></div>
</body>
</html>
```

## Conclusion

Thanks you for participating in the workshop. If you have any follow up questions feel free to [contact me](https://www.facebook.com/jelisejev.p).
