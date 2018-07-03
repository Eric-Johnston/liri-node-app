require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv
var argument = ""
var txtFile = [];

for(i = 2; i < cmd.length; i++){
    argument = argument + cmd[i];

    switch(argument){
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifySearch();
            break;
        case "movie-this":
            if(cmd[3] == null){
                defaultMovie()
            }
            else{
                movieSearch();
            }
            break;
        case "do-what-it-says":
            textRead();
    }

        function myTweets(){
            console.log("Grabbing tweets...");
            console.log("-----------------------------------------------");
            var params = {screen_name: "CheeseTony", count: 5}
            client.get("statuses/user_timeline", params, function(error, tweets, response){
    
                for(var i = 0; i < tweets.length; i++){
                    if(!error){
                        console.log(tweets[i].created_at)
                        console.log(tweets[i].text)
                        console.log("-----------------------------------------------");
                    }
                    else{
                        console.log(error)
                    }
                }
            })
        }

        function spotifySearch(){
            console.log("Finding song...");
            console.log("-----------------------------------------------");
            var params = {type: "track", query: cmd[3]}
            spotify.search(params, function(err, data){
                if(!err){
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    console.log("--------------------------------------------");
                }
                else{
                    console.log("Error occured: " + err);
                    console.log("-----------------------------------------------");
                }
            })
        }

        function defaultMovie(){
            var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&apikey=7ea4a7e4";
            console.log("No parameters entered. Try movie-this 'movie'")
            console.log("-----------------------------------------------");
            request(queryUrl, function(error, response, body){
                if(!error && response.statusCode == 200){
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors)
                    console.log("-----------------------------------------------");
                }
                else{
                    console.log("An error occured: " + error)
                    console.log("-----------------------------------------------");
                }
            })
             
        }

        function movieSearch(){
            var queryUrl = "http://www.omdbapi.com/?t=" + cmd[3] + "&apikey=7ea4a7e4"
            console.log("Finding movie...")
            console.log("-----------------------------------------------");
            request(queryUrl, function(error, response, body){
                if(!error && response.statusCode == 200){
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors)
                    console.log("-----------------------------------------------");
                }
                else{
                    console.log("An error occured: " + error)
                    console.log("-----------------------------------------------");
                }
            })
        }

        function textRead(){
            fs.readFile("random.txt", "utf-8", function(err, data){
                var obj = false;
                if(obj){
                    return console.log(err)
                }
                var output = data
                console.log(output)
                txtFile.push(output)
                console.log(txtFile)
            })
        }
}