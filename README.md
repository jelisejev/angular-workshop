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

### Step 1: initial markup and styles

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
