const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const DB = require('./redisDatabase')

let accessToken; // assigned by the route

// Spotify API: get top artists and track of user
router.route('/')
    .get(async (req, res) => {
        // Get access token
        accessToken = req.query.access_token;
        const username = req.query.username;

        // Get user1's uuid
        const user = await DB.generateCode(username);
        const uuid1 = user.uuid;
        // Get user2's uuid
        const uuid2 = req.query.uuid2;

        // Get User info + data
        const user1Data = await DB.callDatabase(uuid1);
        const user2Data = await DB.callDatabase(uuid2);

        // Holds both Users' Names
        const users = {
            user1: user1Data.spotify.display_name,
            user2: user2Data.spotify.display_name
        }

        const spotify_id = user1Data.spotify.id

        // Top Tracks
        const user1TopTracks = user1Data.top_tracks;
        const user2TopTracks = user2Data.top_tracks;

        // Graph + recommendations
        const data = await createPlaylist(user1TopTracks, user2TopTracks, users, spotify_id)

        // Send Data to frontend
        res.send(data);
    })

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Takes in top songs for both artists, the access token, the names of both users as as json, and the user id to save
async function createPlaylist(user1Songs, user2Songs, usernames, user_id) {

    const user1SongsURIs = user1Songs.map(song => song.uri);
    const user2SongsURIs = user2Songs.map(song => song.uri);
    const allSongURIs = [...  new Set([...user1SongsURIs, ...user2SongsURIs])];
    shuffle(allSongURIs);

    let options = {
        method: 'POST',
        body: JSON.stringify({
            name: `${usernames.user1} and ${usernames.user2}'s MusicBridge Playlist`,
            description: "Done using MusicBridge",
            public: "True"
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application / json'
        },
        json: true
    };
    let queryString = `https://api.spotify.com/v1/users/${user_id}/playlists?`;
    let response = await fetch(queryString, options);
    let playlistInfo = await response.json();

    options = {
        method: 'POST',
        body: JSON.stringify({
            uris: allSongURIs
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application / json'
        },
        json: true
    };
    
    queryString = `https://api.spotify.com/v1/playlists/${playlistInfo.id}/tracks?`
    response = await fetch(queryString, options);
    
    return {
        url: playlistInfo.external_urls.spotify,
        uri: playlistInfo.uri
    }
}

module.exports = router;