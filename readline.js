// readline.js

const readline = require('readline');
const fs = require("fs");



    async function processLineByLine() {
        const fileStream = fs.createReadStream('random.txt');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });
          // Note: we use the crlfDelay option to recognize all instances of CR LF
          // ('\r\n') in input.txt as a single line break.

          for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            console.log(`Line from file: ${line}`);
          }
        }
        
        processLineByLine();
        
    
  
//   // Then split it by commas (to make it more readable)
//   var dataArr = data.split(",");

//   // We will then re-display the content as an array for later use.
//   console.log(dataArr);

//   console.log("type= " + typeof dataArr[0]);

//   switch (dataArr[0]) {
//       case "spotify-this-song":
//           op = dataArr[0];
//           song = dataArr[1];
//           queryString = "track:" + "\"" + song + "\"";
//           getSong();
//           break;
//       case "movie-this":
//           op = dataArr[0];
//           movieName = dataArr[1];
//           queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
//           getData();
//           break;
//       case  "concert-this":
//           op = dataArr[0];
//           artist = dataArr[1];
//           queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//           getData();
//   }
// });
// }