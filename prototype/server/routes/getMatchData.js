// Purpose of this file is to return the necessary data for a match between two users:
//  1. Graph data (nodes, links)
//  2. Playlist (TODO: what we actually want to send back.)

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const DB = require('./redisDatabase')
const Friend = require('./findUser');

const fetchHelpers = require('./utilities/fetchHelpers')
const fetch_retry = fetchHelpers.fetch_retry;

const CONFIG = require("../CONFIG/fetchConfigs");


let accessToken; // assigned by the route

// Spotify API: get top artists and track of user
router.route('/')
    .get(async (req, res) => {
        // Get access token

        // const uuid_input = req.query.uuid;
        // const access_token = req.query.access_token;
        // console.log(uuid_input,access_token);
        // await Friend.findFriend(uuid_input);

        accessToken = req.query.access_token;
        const username = req.query.username;

        // Get user1's uuid
        const user = await DB.generateCode(username);
        const uuid1 = user.uuid;
        // Get user2's uuid
        const uuid2 = req.query.uuid2;

        console.log("Print testing for routing " + uuid2, username ,accessToken);


        // Get User info + data
        const user1Data = await DB.callDatabase(uuid1);
        const user2Data = await Friend.findFriend(uuid2);

        console.log(user2Data);

        if (user2Data === "error") {
            console.log("User not found in Database");
            res.redirect("http://localhost:3000/notfound");

        } else {

            // Holds both Users' Names
            const users = {
                user1: user1Data.spotify.display_name,
                user2: user2Data.spotify.display_name
            }

            // Top Artists
            const user1TopArtists = user1Data.top_artists;
            const user2TopArtists = user2Data.top_artists;

            // Graph + recommendations
            const data = await formatGraphData(user1TopArtists, user2TopArtists, users)
            const graph = data[0], allArtistsNames = data[1];
            const recommendations = await getRecommendedArtistsTasteDive(allArtistsNames);

            // Send Data to frontend
            res.send({graph, recommendations, users});
        }
    })

// Returns a list of 6 new artists to check out using TasteDive API and Spotify for Artist Profile Info
async function getRecommendedArtistsTasteDive(artists) {

    // Make call to TasteDive API
    const params = new URLSearchParams({
        q: artists.join(","),
        limit: 6,
        type: "music",
        k: CONFIG.tasteDive.accessKey
    });
    const queryString = 'https://tastedive.com/api/similar?' + params;
    let response = await fetch(queryString);
    const data = await response.json();
    // Get names of all recommendations from taste dive
    const recommendations = data.Similar.Results.map(a => a.Name);

    // Used to store all spotify info for each recommended artist (ultimate result)
    const recommendationsSpotify = {};
    // Fetch options
    const options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        json: true
    };

    // Make multiple calls to spotify API
    await Promise.all(
        recommendations.map(async artist => {
            const params = new URLSearchParams({
                q: artist,
                limit: 1,
                type: "artist",
            });

            const queryString = 'https://api.spotify.com/v1/search?' + params;
            const response1 = await fetch_retry(queryString, options, 10);
            const data1 = await response1.json();
            
            const artistInfo = data1.artists.items[0];
            // Save artist name, url, and little picture
            recommendationsSpotify[artist] = {
                name: artist,
                url: artistInfo.external_urls.spotify,
                photo: artistInfo.images[2].url
            };
        })
    );
    // Return desired result
    return recommendationsSpotify;
}

// Returns all related artists for each artist in the artists array using spotify API
async function getRelatedArtistsSpotify(artists) {
    let result = {}

    const options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        json: true
    };
    
    // Get each artist's recommendations
    await Promise.all( 
        artists.map(async artist => {
            const queryString = `https://api.spotify.com/v1/artists/${artist.id}/related-artists`;
            const response = await fetch_retry(queryString, options, 10);
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
    let artistAssociations = await getRelatedArtistsSpotify(allArtistsIdAndNames);

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
                association: assoc,
                url: artist.external_urls.spotify,
                photo: artist.images[2].url
            }
        )
        // Create Links to associations
        assoc.forEach(artistAssoc => links.push({ source: artist.name, target: artistAssoc }))
    });

    // Parse through user 2 top artists
    user2Data.forEach(artist => {
        let assoc = artistAssociations[artist.name].filter(a => allArtistsNames.includes(a));
        if (!user1ArtistsNames.includes(artist.name)) {
            nodes.push(
                {
                    id: artist.name,
                    source: userNames.user2,
                    genres: artist.genres,
                    association: assoc,
                    url: artist.external_urls.spotify,
                    photo: artist.images[2].url
                }
            )
            // Create Links to associations
            assoc.forEach(artistAssoc => links.push({ source: artist.name, target: artistAssoc }))
        }
    });

    return [{ "nodes": nodes, "links": links }, allArtistsNames];
}

module.exports = router;
