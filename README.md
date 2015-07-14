# Movie search application using Angular JS

## Environment setup

1. Download and install node from https://nodejs.org/download/
2. Use npm to install bower
```
npm install -g bower
```
3. Install a basic node http server
```
npm install -g http-server
```
4. Switch to the app folder and run the server
```
cd app
http-server
```

The application should be available at http://0.0.0.0:8080

## About the API

For this example we'll use the movie database API provided by themoviedb.org. Detailed information about the API is [available here](http://docs.themoviedb.apiary.io/).

Two endpoints are used in this workshop: [/search/movie](http://docs.themoviedb.apiary.io/#reference/search/searchmovie/get) and [/movie/:id](http://docs.themoviedb.apiary.io/#reference/movies/movieid/get).

## Step-by-step guide
