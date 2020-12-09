// Purpose of this file is to return the necessary data for a match between two users:
//  1. Graph data (nodes, links)
//  2. Playlist (TODO: what we actually want to send back.)

const express = require('express');
const router = express.Router();
const request = require('request')
const fetch = require('node-fetch')

testData = require("../test-data/dummy_spotify_data.json");
const CONFIG = require("../CONFIG/fetchConfigs");

const elisson = testData.elisson.items;
const rafael = testData.rafael.items;
const userNames = {
    user1: "elisson",
    user2: "rafael"
}
let accessToken; // assigned by the route

// Spotify API: get top artists and track of user
router.route('/')
    .get(async (req, res) => {
        accessToken = req.query.access_token

        const options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
        };

        request.get(options,  async function(error, response, body) {
            const data = await formatGraphData(elisson, rafael, userNames)
            const graph = data[0], allArtistsNames = data[1];
            res.send(graph);
        });
    })

// Returns all recommended artists for each artist in the artists array
async function getArtistRecommendations(artists) {
    let result = {}

    // Used to wait in case we need to retry
    async function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    // Mechanism to retry calling the API in case we reach the rate limit
    async function fetch_retry(artist, retries) {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
        };
        
        let response = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, options);
        if (response.status == 429) {
            if (retries > 0) {
                await wait(response.headers.get("retry-after") * 1000).then(console.log("retrying"));
                return await fetch_retry(artist, retries - 1); 
            } else {
                return [];
            }
        } else {
            return response
        }        
    }
    
    // Get each artist's recommendations
    await Promise.all( 
        artists.map(async artist => {

            const response = await fetch_retry(artist, 10);
            const data = await response.json();
            result[artist.name] = data.artists.map(a => a.name);
        })
    );
    return result
}

// Format spotify data such that it fits the graph model
async function formatGraphData(user1Data, user2Data, userNames) {
    /* Node ->
     *   id (artist name),
     *   source (user from which it came from (either user1, user2, or both),
     *   genres, associations (lsit of artists to link to),
     *   url (artist url),
     *   photo (artist photo)
     */

     /* Link ->
     *   source: artist a,
     *   destination artist b
     */
    const user1ArtistsNames = user1Data.map(g => g.name);
    const user2ArtistsNames = user2Data.map(g => g.name);
    const user1ArtistsIdAndNames = user1Data.map(g => { return {id: g.id, name: g.name} });
    const user2ArtistsIdAndNames = user2Data.map(g => { return { id: g.id, name: g.name } });
    const allArtistsNames = [... new Set([...user1ArtistsNames, ...user2ArtistsNames])];
    const allArtistsIdAndNames = [... new Set([...user1ArtistsIdAndNames, ...user2ArtistsIdAndNames])];

    let artistAssociations = await getArtistRecommendations(allArtistsIdAndNames);

    nodes = [];
    links = [];
    // Parse through user 1 top artists
    user1Data.forEach(artist => {
        let assoc = artistAssociations[artist.name].filter(a => allArtistsNames.includes(a));
        nodes.push(
            {
                id: artist.name,
                source: artist.name in user1ArtistsNames && user2ArtistsNames ? "both" : userNames.user1,
                genres: artist.genres,
                associations: assoc,
                url: artist.external_urls.spotify,
                photo: artist.images[2]
            }
        )
        // Create Links to associations
        assoc.forEach(artistAssoc => links.push({ source: artist.name, destination: artistAssoc }))
    });

    // Parse through user 2 top artists
    user2Data.forEach(artist => {
        let assoc = artistAssociations[artist.name].filter(a => allArtistsNames.includes(a));
        if (!user2ArtistsNames.includes(artist.name)) {
            nodes.push(
                {
                    id: artist.name,
                    source: userNames.user2,
                    genres: artist.genres,
                    associations: assoc,
                    url: artist.external_urls.spotify,
                    photo: artist.images[2]
                }
            )
            // Create Links to associations
            assoc.forEach(artistAssoc => links.push({ source: artist.name, destination: artistAssoc }))
        }
    });

    return [{ "nodes": nodes, "links": links }, allArtistsNames];
}

module.exports = router;
