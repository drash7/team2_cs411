// Purpose of this file is to return the necessary data for a match between two users:
//  1. Graph data (nodes, links)
//  2. Playlist (TODO: what we actually want to send back.)

testData = require("../test-data/dummy_spotify_data.json");
const CONFIG = require("../CONFIG/fetchConfigs");
const accessKey = CONFIG.tasteDive.accessKey;
const router = require("./index.js");
const request = require('request')

const elisson = testData.elisson.items;
const rafael = testData.rafael.items;
const userNames = {
    user1: "elisson",
    user2: "rafael"
}


async function getArtistRecommendations(artist) {
    const options = {
        url: `/v1/artists/${artist}/related-artists`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, async function (error, response, body) {
        console.log(error)
    })
}

getArtistRecommendations("0D3h8NZqNp7BN97JwtV6eW");

async function formatGraphData(user1Data, user2Data, userNames) {
    // Create Nodes
    /* Node ->
    *   id (artist name), 
    *   source (user from which it came from (either user1, user2, or both), 
    *   genres, associations (lsit of artists to link to),
    *   url (artist url), 
    *   photo (artist photo) 
    */

    const user1ArtistsNames = user1Data.map(g => g.name);
    const user2ArtistsNames = user2Data.map(g => g.name);
    const allArtistsNames = [... new Set([...user1ArtistsNames, ...user2ArtistsNames])];

    // TODO: Change Taste Dive to call based off of single artist and get back all recommendations

    // console.log(relations);

    nodes = [];
    links = [];

    user1Data.forEach(artist => {
        // let relations;
        nodes.push(
            {
                id: artist.name,
                source: artist.name in user1ArtistsNames && user2ArtistsNames ? "both" : userNames.user1,
                genres: artist.genres,
                associations: relations,
                url: artist.external_urls.spotify,
                photo: artist.images[2]
            }
        )
    });

    // console.log(nodes)

    // Create Links
}   // Link -> source, destination

formatGraphData(elisson, rafael, userNames);
// console.log(elisson[0].images);