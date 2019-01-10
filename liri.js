
// liri-node-app:liri.js


require("dotenv").config();

// fs is a core Node package for reading and writing files
let fs = require("fs");

let keys = require("./keys.js");

let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

let util = require('util');
let moment = require('moment');

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

// Then create a request with axios to the queryUrl for Bands in Town Artist Events API
// ...

function formatMovie(repdata) {
    console.log("movie title= " + repdata.data.Title);
    console.log("movie release year= " + repdata.data.Year);
    console.log("movie IMDB rating= " + repdata.data.imdbRating);
    console.log("movie rotten tomaoes rating= " + repdata.data.Ratings[1].Source.Value);
    console.log("movie country where produced= " + repdata.data.Country);
    console.log("movie language " + repdata.data.Language);
    console.log("movie plot= " + repdata.data.Plot);
    console.log("movie actors in the " + repdata.data.Title + " are " + repdata.data.Actors);
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
                    // dt = rawDate.split("T");
                    // console.log(dt[0]);
                    // console.log(dt[1]);
                    // dt = rawDate;
                    // cookedDate = dt.replace(/'/g, "");
                    // console.log("cookedDate= " + cookedDate);
                    displayDate = moment(cookedDate).format("MM/DD/YYYY  hh:mm a");
                    // console.log(newdate);


        // console.log("isValid= " + moment(util.inspect(repdata.data[i].datetime)).isValid());
        // rawDate = util.inspect(repdata.data[i].datetime);
        // cookedDate = moment(rawDate).format("YYYY Do MM");
        // console.log("cookedDate= " + cookedDate);
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
        // console.log(response.data.Year)
        // repdata = response.data.Year;
        // repdata = response;
        formatMovie(response);
    } else if (op === "concert-this"){
        // repdata = response;
        // formatConcert();
        // console.log(util.inspect(response.data[0].venue));
        // console.log(util.inspect(response.data[0].offers));
        // repdata = response;
        formatConcert(response);
        // console.log(JSON.stringify(response));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getSong() {
    // spotify.search({ type: 'track', query: 'track:"song + ", limit: '12' })
    spotify.search({ type: 'track', query: queryString, limit: '12' })
    // spotify.search({ type: 'track', query: 'track:"The+Sign"', limit: '12' })
  .then(function(response) {
    // console.log("*************** spotify");
    // console.log(response.artists.items);
    // console.log(response.tracks.items);
    // console.log(response.tracks);
    // console.log("Looking for album **********");
    // console.log(response.tracks.items[i].album);

    formatSong(response);

    // for ( i=0; i<response.tracks.items.length; i++) {
    //     console.log("******** Keepers *******");
    //     console.log(response.tracks.items[i].name);
    //     console.log(response.tracks.items[i].preview_url);
    //     console.log(response.tracks.items[i].artists[0].name);
    //     console.log(response.tracks.items[i].album.name);      
    // }
    
    //  console.log(response.tracks.items[0].artists[0].name);
    //  console.log(response.tracks.items[1].artists[0].name);
    })
  .catch(function(err) {
    console.log(err);
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
      
      });
      

}

switch (op) {
    case "movie-this":
        movieName = process.argv[3];
        queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        getData();
    break;
    case "concert-this":
        artist = process.argv[3];
        queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        getData();
    break;
    case "spotify-this-song":
        song = process.argv[3];
        // queryString = "track:" + "\"The+Sign\"";
        queryString = "track:" + "\"" + song + "\"";
        console.log("queryString= " + queryString)
        getSong();
        break;
    case "do-what-it-says":
         console.log("running commands from random.txt");
         doIt();
}



// Then create a request with axios to the queryUrl
// ...
// axios.get(queryUrl)
//   .then(function (response) {
    
//     console.log(response.data.Released);
    
//         myResponse = response;

//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// If the request with axios is successful
// ...

// console.log("******* myResponse=" + myResponse.data);
 
// console.log("******* myResponse=" + JSON.stringify(myResponse.data.Released));

// Then log the Release Year for the movie
// ...

