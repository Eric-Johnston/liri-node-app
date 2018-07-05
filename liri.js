require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv;
var argument = "";

for(i = 2; i < cmd.length; i++){
    argument = argument + cmd[i];

    switch(argument){
        case "my-tweets":
            myTweets();
            logTxt();
            break;
        case "spotify-this-song":
            if(cmd[3] == null){
                defualtSong();
                logTxt();
            }
            else{
            spotifySearch();
            logTxt();
            }
            break;
        case "movie-this":
            if(cmd[3] == null){
                defaultMovie()
                logTxt();
            }
            else{
                movieSearch();
                logTxt();
            }
            break;
        case "do-what-it-says":
            textRead();
            logTxt();
    }

        function myTweets(){
            console.log("Grabbing tweets...");
            console.log("-----------------------------------------------");
            var params = {screen_name: "CheeseTony", count: 20}
            client.get("statuses/user_timeline", params, function(error, tweets, response){
    
                for(var i = 0; i < tweets.length; i++){
                    if(!error){
                        console.log(tweets[i].created_at)
                        console.log(tweets[i].text)
                        console.log("-----------------------------------------------");
                        logTxt(tweets[i].created_at +"\n"+tweets[i].text)
                    }
                    else{
                        console.log(error)
                    }
                }
            })
        }

        function defualtSong(){
            var songName = "The Sign Ace of Base";
            var params = {type: "track", query: songName};
            spotify.search(params, function(err, data){
                if(!err){
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    console.log("--------------------------------------------");
                    logTxt("Artist: "+data.tracks.items[0].artists[0].name+"\n"+"Album: " + data.tracks.items[0].album.name +"\n"+"Song: " + data.tracks.items[0].name +"\n"+"Preview Link: " + data.tracks.items[0].preview_url)
                }
                else{
                    console.log("Error occured: " + err);
                    console.log("-----------------------------------------------");
                }
            })
        }

        function spotifySearch(songName){
            console.log("Finding song...");
            console.log("-----------------------------------------------");
            var songName = cmd[3]
            var params = {type: "track", query: songName}
            spotify.search(params, function(err, data){
                if(!err){
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    console.log("--------------------------------------------");
                    logTxt("Artist: "+data.tracks.items[0].artists[0].name+"\n"+"Album: " + data.tracks.items[0].album.name +"\n"+"Song: " + data.tracks.items[0].name +"\n"+"Preview Link: " + data.tracks.items[0].preview_url)
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
                    logTxt("Title: " + JSON.parse(body).Title+"\n"+"Release Year: " + JSON.parse(body).Year+"\n"+"IMDB Rating: " + JSON.parse(body).Ratings[0].Value+"\n"+"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value+"\n"+"Country: " + JSON.parse(body).Country+"\n"+"Language: " + JSON.parse(body).Language+"\n"+"Plot: " + JSON.parse(body).Plot+"\n"+"Actors: " + JSON.parse(body).Actors)

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
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("-----------------------------------------------");
                    logTxt("Title: " + JSON.parse(body).Title+"\n"+"Release Year: " + JSON.parse(body).Year+"\n"+"IMDB Rating: " + JSON.parse(body).Ratings[0].Value+"\n"+"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value+"\n"+"Country: " + JSON.parse(body).Country+"\n"+"Language: " + JSON.parse(body).Language+"\n"+"Plot: " + JSON.parse(body).Plot+"\n"+"Actors: " + JSON.parse(body).Actors)
                }
                else{
                    console.log("An error occured: " + error);
                    console.log("-----------------------------------------------");
                }
            })
        }

        var logInfo = "";
        function logTxt(logInfo = ""){
            fs.appendFile("log.txt", "\n"+ logInfo+ "\n-----------------------------------------------", "utf-8", function(err){
                if(err){
                    console.log("Error has occured: " + err)
                }
            })
        }

}
        function textRead(){
            fs.readFile("random.txt", "utf-8", function(err, data){
                console.log("Finding song...");
                console.log("-----------------------------------------------");
                if(!err){
                    var output = data.split(",");
                    var songName = (output[1])
                    var params = {type: "track", query: songName}
                    spotify.search(params, function(err, data){
                        if(!err){
                            console.log("Artist: " + data.tracks.items[0].artists[0].name);
                            console.log("Album: " + data.tracks.items[0].album.name);
                            console.log("Song: " + data.tracks.items[0].name);
                            console.log("Preview Link: " + data.tracks.items[0].preview_url);
                            console.log("--------------------------------------------");
                            logTxt("Artist: "+data.tracks.items[0].artists[0].name+"\n"+"Album: " + data.tracks.items[0].album.name +"\n"+"Song: " + data.tracks.items[0].name +"\n"+"Preview Link: " + data.tracks.items[0].preview_url)
                        }
                        else{
                            console.log("Error occured: " + err);
                            console.log("-----------------------------------------------");
                        }
                    })
                }
                else{
                    return console.log(err);
                }
            })
        }