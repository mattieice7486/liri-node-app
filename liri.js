require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var imdb = require('imdb-api');

var action = process.argv[2];

switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movieFunction();
    break;

  case "do-what-it-says":
    doWhat();
    break;
  
  default:
    console.log("\nplease type \n\nmy-tweets \nspotify-this-song \nmovie-this \n-or- \ndo-what-it-says")
};


//////////////////// spotify //////////////////
function spotify() {
  
 var spotify = new Spotify(keys.spotify);
 var nodeArg = process.argv;
 var queryArray = [];
 
 for (var i = 3; i < nodeArg.length; i++) {
  
    queryArray.push(nodeArg[i]);      
  } 
 spotify.search({ type: 'track', query: queryArray, limit: 1 }, function(err, data) {
  if (err) {
    spotify
    .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
    .then(function(data) {
    console.log('Artist: ' + data.album.artists[0].name); 
    console.log('Song Name: ' + data.name); 
    console.log("Preview Link of Song: " + data.preview_url); 
    console.log("Album Name: " + data.album.name);
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
   }
  console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
  console.log('Song Name: ' + data.tracks.items[0].name);
  console.log("Preview Link of Song: " + data.tracks.items[0].preview_url);
  console.log("Album Name: " + data.tracks.items[0].album.name);
 });
};

////////////////// twitter ///////////////////
function tweet() {

  var client = new Twitter(keys.twitter);
  
  var params = {
    count: 20,
    screen_name: 'Mattieice7486'
  };

    client.get('statuses/user_timeline', params , function(err, data) {
      for (var i = 0; i < data.length ; i++) {
      console.log('Tweet: ' + data[i].text);
        console.log('Tweet created at: ' + data[i].created_at);
      }
  });
};

///////////////// imdb ///////////////////////
function movieFunction() {
  var nodeArg = process.argv;
  var queryArray = [];
  for (var i = 3; i < nodeArg.length; i++) {
      queryArray.push(nodeArg[i]); 
      var concatArray = (queryArray.join(' '));     
    };
    imdb.get(concatArray, {apiKey: '40e9cece', timeout: 30000}).then(function (data, err) {
    console.log('Movie Title: ' + data.title);
    console.log('Year: ' + data.year); 
    console.log('IMDB Rating: ' + data.ratings[0].Value);   
    console.log('Rotton Tomatoes Rating: ' + data.ratings[1].Value);  
    console.log('Country: ' + data.country);
    console.log('Language: ' + data.languages);
    console.log('Movie Plot: ' + data.plot);
    console.log('Actors: ' + data.actors);
    })
  .catch(function(err) {
    imdb.get('Mr. Nobody', {apiKey: '40e9cece', timeout: 30000}).then(function (data, err) {
      console.log('Movie Title: ' + data.title);
      console.log('Year: ' + data.year); 
      console.log('IMDB Rating: ' + data.ratings[0].Value);   
      console.log('Rotton Tomatoes Rating: ' + data.ratings[1].Value);  
      console.log('Country: ' + data.country);
      console.log('Language: ' + data.languages);
      console.log('Movie Plot: ' + data.plot);
      console.log('Actors: ' + data.actors);
      console.error('Error occurred: ' + err); 
    });
  });
};

function doWhat() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
  
    var output = data.split(",");
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: output[1], limit: 1 }, function(err, data) {
     if (err) {
       spotify
       .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
       .then(function(data) {
       console.log('Artist: ' + data.album.artists[0].name); 
       console.log('Song Name: ' + data.name); 
       console.log("Preview Link of Song: " + data.preview_url); 
       console.log("Album Name: " + data.album.name);
       })
       .catch(function(err) {
         console.error('Error occurred: ' + err); 
       });
      }
     console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
     console.log('Song Name: ' + data.tracks.items[0].name);
     console.log("Preview Link of Song: " + data.tracks.items[0].preview_url);
     console.log("Album Name: " + data.tracks.items[0].album.name);
    });
  });
};