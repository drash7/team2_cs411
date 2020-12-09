const CONFIG = require("../../CONFIG/fetchConfigs");
const { tasteDive } = CONFIG;
const { access_key } = tasteDive;

const axios = require("axios");

// let uri = `https://tastedive.com/api/similar?q=${artist}&info=1&k=${access_key}`

let dummyData = [
  "Lauren Jauregui",
  "Qveen Herby",
  "Julia Michaels",
  "Sabrina Claudio",
  "Olivia O'brien",
  "Sigrid",
  "Kiana Ledé",
  "Jaira Burns",
  "Heavy Baile",
  "Cupcakke",
  "Luísa Sonza",
  "Kim Petras",
  "Megan Thee Stallion",
  "Terror Jr",
  "Everglow",
  "Cardi B",
  "Rina Sawayama",
  "Gloria Groove",
  "Chung Ha",
  "Isak Danielson",
];

/*

    * We are getting the below response for the Array

[
  'Billie Eilish',
  'Pabllo Vittar',
  'Stefflon Don',
  'Ben Platt',
  'Hayley Kiyoko'
]

*/

//All related artists -->

async function allSimilarArtists(artistList) {
  function allSimilarArtistsAPI(artistList) {
    return artistList.map(async (artist) => {
      return (
        await axios.get(
          `https://tastedive.com/api/similar?q=${artist}&info=1&k=${access_key}`
        )
      ).data.Similar.Results.map((_) => _.Name);
    });
  }
  return await Promise.all(allSimilarArtistsAPI(artistList));
}

// get only those related artists who are not in the list
async function absentSimilarArtists(artistList) {
  let data = await allSimilarArtists(artistList);
  // console.log(data);
  let inOneArray = [];
  data.forEach((datum) => datum.forEach((ele) => inOneArray.push(ele)));
  let filteredList = inOneArray
    .filter((ele) => artistList.indexOf(ele) < 0)
    .filter((_, i) => i < 5);
  return filteredList;
}

// absentSimilarArtists(dummyData).then((data) => console.log(data));

async function getRecommendedArtist(artistList, access_token){
  return await Promise.all(
    ((recommendedArtistList, access_token) => {
      return recommendedArtistList.map(async artist => {
        // get artist as an object
        let artistData = (await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`,{
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })).data
        return {
          // extract artist's name, Spotify url and images from the object, create a new object with just that
          name: artist,
          spotifyUrl: artistData[artist].items.length > 0? 
          (
            artistData[artist].items.map(data => ({ name: data.name, spotifyLink: data.external_urls.spotify }))
          )
          :artistData[artist].items[0].external_urls.spotify,
          imageUrl: artistData[artist].items.length > 0? 
          (
            artistData[artist].items.map(data => ({ name: data.name, imageLink: data.images }))
          )
          :artistData[artist].items[0].images,
        }
      })
    })((await absentSimilarArtists(artistList)), access_token)
  )
}

module.exports = getRecommendedArtist

/* 
All we should really need for this to work is the access token (since I haven't been able to access it, I haven't 
tested it either). I've been having trouble even running the server. That aside, this should work.
TO-DO: Require this function in getMatchData and pass in the allArtistNames list along with the access token.
It should return an array of objects, each object belonging to an artist, giving us their name, profile url 
and images
*/