
// liri-node-app:liri.js


require("dotenv").config();

// fs is a core Node package for reading and writing files
const fs = require("fs");
const keys = require("./keys.js");

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

const util = require('util');
const moment = require('moment');

const readline = require('readline');

// liri commands to process
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

let axios = require("axios");
let myResponse = {};
let op = process.argv[2];
let repdata;
let queryString;

// var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



function formatMovie(repdata) {
    console.log("movie title:  " + repdata.data.Title);
    console.log("movie release year:  " + repdata.data.Year);
    console.log("movie IMDB rating:  " + repdata.data.imdbRating);
    console.log("movie rotten tomaoes rating:  " + repdata.data.Ratings[1].Source.Value);
    console.log("movie country where produced:  " + repdata.data.Country);
    console.log("movie language: " + repdata.data.Language);
    console.log("movie plot:  " + repdata.data.Plot);
    console.log("movie actors in the:  " + repdata.data.Title + " are " + repdata.data.Actors);
    console.log("");
    // console.log(repdata.data);
}

function formatSong(repdata) {
    // console.log(repdata);
    for ( i=0; i<repdata.tracks.items.length; i++) {
        console.log("Song Info: ");
        console.log("Artist Name: " + repdata.tracks.items[i].artists[0].name);
        console.log("Song Name: " + repdata.tracks.items[i].name);
        console.log("Song Preview Link: " + repdata.tracks.items[i].preview_url);       
        console.log("Album Name: " + repdata.tracks.items[i].album.name);  
        console.log("");    
    }
}

function formatConcert(repdata) {   
    // console.log(repdata);
    // console.log(util.inspect(repdata.data[0]));
    for (i=0; i<repdata.data.length; i++) {
        // console.log("venue= " + util.inspect(repdata.data[i].venue));
        console.log("The artist/band " + artist.replace(/\+/g, " ") + " is playing at the following location/s: ");
        console.log("concert venue= " + util.inspect(repdata.data[i].venue.name).replace(/'/g, ""));
        console.log("concert location= " + util.inspect(repdata.data[i].venue.city).replace(/'/g, "") +
                    ", " +  util.inspect(repdata.data[i].venue.country).replace(/'/g, ""));
                    cookedDate = util.inspect(repdata.data[i].datetime).replace(/'/g, "");
                    displayDate = moment(cookedDate).format("MM/DD/YYYY  hh:mm a");
                    // console.log(newdate);
        console.log("concert date = " + displayDate);
        console.log("");
    }
}

function getData() {
    axios.get(queryUrl)
    .then(function (response) {
    // console.log("console log= " + response);
    // console.log(response.data.Released);
    if (op === "movie-this") {
        
        formatMovie(response);
    } else if (op === "concert-this"){
        formatConcert(response);
        // console.log(JSON.stringify(response));
    }
  })
  .catch(function (error) {
    // console.log("Error --  " + error);
    console.log("Error --  No data returned from database." );
  });
}

function getSong() {
    // spotify.search({ type: 'track', query: 'track:"song + ", limit: '12' })
    // spotify.search({ type: 'track', query: queryString, limit: '12' })
    // spotify.search({ type: 'track', query: queryString })
    // spotify.search({ type: 'track', query: 'track:"The+Sign"', limit: '12' })
    spotify.search({ type: 'track', query: queryString, limit: '12' })
  .then(function(response) {
    formatSong(response);
    })
  .catch(function(err) {
    // console.log(err);
    console.log("Error --  No data returned from Spotify.");
  });
}

function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
          
        // We will then print the contents of data
        console.log(data);
     
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        console.log("type= " + typeof dataArr[0]);

        switch (dataArr[0]) {
            case "spotify-this-song":
                op = dataArr[0];
                song = dataArr[1];
                queryString = "track:" + "\"" + song + "\"";
                getSong();
                break;
            case "movie-this":
                op = dataArr[0];
                movieName = dataArr[1];
                queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                getData();
                break;
            case  "concert-this":
                op = dataArr[0];
                artist = dataArr[1];
                queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                getData();
        }
    });
    }

if (process.argv.length < 3) { op = "false";}    
switch (op) {
    case "movie-this":
    if (process.argv.length < 4) { 
        movieName = "Mr+Nobody";
    }
    else {
    movieName = process.argv[3];
    }
    queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    getData();
    break;
    case "concert-this":
        artist = process.argv[3];
        queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        getData();
    break;
    case "spotify-this-song":
        // queryString = "track:" + "\"The+Sign\"";
        if (process.argv.length < 4) { 
            song = "The Sign";
            queryString = "track:" + "\"The+Sign\"" + "artist:" + "Ace+of+Base";
            // console.log(queryString);
        }
        else {
        song = process.argv[3];
        queryString = "track:" + "\"" + song + "\"";
        // console.log("queryString= " + queryString)
        }
        getSong();
        break;
    case "do-what-it-says":
         console.log("running commands from random.txt");
         doIt();
         break;
    case "false":
        console.log("node liri: Usage: movie-this | concert-this | spotify-this-song | do-what-it-says");
}

