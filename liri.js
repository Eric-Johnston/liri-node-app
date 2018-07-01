require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmd = process.argv

for(i = 2; i >= cmd.length; i++){
    cmd = cmd[i];
}