// Retrieve token to use google API

var google = require("googleapis");
var readline = require('readline');
var Youtube = require("youtube-api");

var OAuth2Client = google.auth.OAuth2;
var CLIENT_ID = '448044553762-nrggr8n3ro12l0pb7dc17eglqb8ajmau.apps.googleusercontent.com';
var CLIENT_SECRET = 'KeFx1jUebIZHek2UfD6wGuZY';
var REDIRECT_URL = 'http://127.0.0.1:3000/oauth2callback';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
		// generate consent page url
		var url = oauth2Client.generateAuthUrl({
		access_type: 'offline', // will return a refresh token
		scope: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload' // can be a space-delimited string or an array of scopes
	});

	console.log('Visit the url: ', url);
	rl.question('Enter the code here:', function(code) {
		// request access token
		oauth2Client.getToken(code, function(err, tokens) {
			// set tokens to the client
			// TODO: tokens should be set by OAuth2 client.
			oauth2Client.setCredentials(tokens);
			callback();
		});
	});
}

// retrieve an access token
getAccessToken(oauth2Client, function() {

	console.log(oauth2Client.credentials.access_token);
	Youtube.authenticate({
	    type: "oauth"
	  , token: oauth2Client.credentials.access_token
	});

	var channel = Youtube.channels.list({
	    mine: true,
	    part: 'contentDetails'
	}, function (err, data) {
	    //console.log(err || data);
	    playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
	    console.log(data.items[0].contentDetails);
	});
//	  channel.execute(function(response) {
    
    //requestVideoPlaylist(playlistId);
  //});

//	console.log(channel[1]);
//	playlistId = channel.items[0].contentDetails.relatedPlaylists.uploads;

});
