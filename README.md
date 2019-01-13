### liri-node-app

The liri node.js application is a console command line application that will 
accept user command to query these API databases for information:

* OMDB API
* Spotify-API
* Bands In Town API

#### Running the Application

The liri-node-app is a javascript node.js application that accepts the following 
command line arguments:

* movie-this  "MOVIE TITLE"
* spotify-this-song  "SONG TITLE"
* concert-this  "BANDorARTISIT"
* do-what-it-says 

#### Examples 

To query the OMDB API for information about the movie titled "The Wizard of OZ" 
enter the following command line:

node liri.js movie-this "Star Wars"

To query the Spotify-API for information about the song titled "Beethoven 5th"
enter the following command line:

node liri.js spotify-this-song "Beethoven 5th"

To query the Bands In Town API for concert information about the "Rolling Stones"
enter the following command line:

node liri.js concert-this "Rolling Stones"

To read a command from the file named random.txt.  
Example random.txt file content -- movie-this,"Star Wars"
Enter the following command line:

node liri.js do-what-it-says

* There are default searches set for both the movie-this and spotify-this-song commands if no movie
or song is specified on the command line. 

#### Screen Shots

![](/images/movie-this.png)
![](/images/spotify-this-song.png)
![](/images/concert-this.png)
![](/images/do-what-it-says.png)

![](/images/movie-this-default.png)
![](/images/concert-this-default.png)





