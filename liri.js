require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv
var argument = ""

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
            /*movie function*/
            break;
        case "do-what-it-says":
            /*fs .txt read*/
        }

        function myTweets(){
            var params = {screen_name: "CheeseTony", count: 5}
            client.get("statuses/user_timeline", params, function(error, tweets, response){
    
                for(var i = 0; i < tweets.length; i++){
                    if(!error){
                        console.log(tweets[i].created_at)
                        console.log(tweets[i].text)
                        console.log("--------------------------------------------")
                    }
                    else{
                        console.log(error)
                    }
                }
            })
        }

        function spotifySearch(){
            var params = {type: "track", query: cmd[3]}
            spotify.search(params, function(err, data){
                if(!err){
                    console.log("Artist: " + data.tracks.items[0].artists[0].name)
                    console.log("Album: " + data.tracks.items[0].album.name)
                    console.log("Song: " + data.tracks.items[0].name)
                    console.log("Preview Link: " + data.tracks.items[0].preview_url)
                    console.log("--------------------------------------------")
                }
                else{
                    return console.log("Error occured: " + err);
                }
            })
        }
}