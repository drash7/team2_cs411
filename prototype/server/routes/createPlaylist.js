const fetch = require('node-fetch');
const fetchHelpers = require('./utilities/fetchHelpers')

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function createPlaylist(user1Songs, user2Songs, accessToken, usernames, user_id) {

    const user1SongsURIs = user1Songs.map(song => song.uri);
    const user2SongsURIs = user2Songs.map(song => song.uri);
    const allSongURIs = [...  new Set([...user1SongsURIs, ...user2SongsURIs])];
    shuffle(allSongURIs);

    let options = {
        method: 'POST',
        body: JSON.stringify({
            name: `${usernames.user1} and ${usernames.user2}'s Music Bridge Playlist`,
            description: "Done thanks to MusicBridge",
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
        uri: 'spotify:playlist:1G9a7AQuB1EzXmsZ4UY0Uq'
    }
}

module.exports = createPlaylist;