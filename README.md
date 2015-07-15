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
