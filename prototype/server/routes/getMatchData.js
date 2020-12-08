// Purpose of this file is to return the necessary data for a match between two users:
//  1. Graph data (nodes, links)
//  2. Playlist (TODO: what we actually want to send back.)

const express = require('express');
const router = express.Router();
const request = require('request')

testData = require("../test-data/dummy_spotify_data.json");
const CONFIG = require("../CONFIG/fetchConfigs");
const accessKey = CONFIG.tasteDive.accessKey;

const elisson = testData.elisson.items;
const rafael = testData.rafael.items;
const userNames = {
    user1: "elisson",
    user2: "rafael"
}


// Spotify API: get top artists and track of user
router.route('/')
    .get(async (req, res) => {
        let accessToken = await req.query.access_token

        const options = {

            //https://api.spotify.com/v1/artists/{artistID}/related-artists
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
        };

        request.get(options,  async function(error, response, body) {
            res.send(body);
        });
    })


//
// async function getArtistRecommendations(artist) {
//     const options = {
//         url: `/v1/artists/${artist}/related-artists`,
//         headers: { 'Authorization': 'Bearer ' + access_token },
//         json: true
//     };
//
//     request.get(options, async function (error, response, body) {
//         console.log(error)
//     })
// }
//
// getArtistRecommendations("0D3h8NZqNp7BN97JwtV6eW");
//
// async function formatGraphData(user1Data, user2Data, userNames) {
//     // Create Nodes
//     /* Node ->
//     *   id (artist name),
//     *   source (user from which it came from (either user1, user2, or both),
//     *   genres, associations (lsit of artists to link to),
//     *   url (artist url),
//     *   photo (artist photo)
//     */
//
//     const user1ArtistsNames = user1Data.map(g => g.name);
//     const user2ArtistsNames = user2Data.map(g => g.name);
//     const allArtistsNames = [... new Set([...user1ArtistsNames, ...user2ArtistsNames])];
//
//     // TODO: Change Taste Dive to call based off of single artist and get back all recommendations
//
//     // console.log(relations);
//     let artistAssociations ;
//
//     nodes = [];
//     links = [];
//
//     user1Data.forEach(artist => {
//         // let relations;
//         nodes.push(
//             {
//                 id: artist.name,
//                 source: artist.name in user1ArtistsNames && user2ArtistsNames ? "both" : userNames.user1,
//                 genres: artist.genres,
//                 associations: artist_associations[artist],
//                 url: artist.external_urls.spotify,
//                 photo: artist.images[2]
//             }
//         )
//
//         artistAssociations[artist].forEach(artistAssoc => links.push({ source: artist, destination: artistAssoc }))
//     });
//
//     user2Data.forEach(artist => {
//         // let relations;
//         if (!user2ArtistsNames.includes(artist.name)) {
//             nodes.push(
//                 {
//                     id: artist.name,
//                     source: userNames.user2,
//                     genres: artist.genres,
//                     associations: artist_associations[artist],
//                     url: artist.external_urls.spotify,
//                     photo: artist.images[2]
//                 }
//             )
//
//             artistAssociations[artist].forEach(artistAssoc => links.push({ source: artist, destination: artistAssoc }))
//         }
//     });
//
//     return {"nodes": nodes, "links": links}
//
//     // console.log(nodes)
//
//     // Create Links
// }   // Link -> source, destination
//
// formatGraphData(elisson, rafael, userNames);
// // console.log(elisson[0].images);



module.exports = router;
