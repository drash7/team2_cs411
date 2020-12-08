const CONFIG = require("../CONFIG/fetchConfigs");

const accessKey = CONFIG.tasteDive.accessKey;

// const API  = `https://tastedive.com/api/similar?q=${artist}&info=1&k=${access_key}`

// this can be replaced with the list of artists sent from Spotify
let artists = ["Billie Eilish", "Cardi B"];

const axios = require("axios");

async function getDataAPI(artists) {
  function getData(artists) {
    return artists.map(async (artist) => {
      return{
        id: artist,
        associations:(await axios.get (
          `https://tastedive.com/api/similar?q=${artist}&info=1&k=${accessKey}`
        )).data.Similar.Results.map(_ => _.Name)
      } 
      
    });
  }
 return (await Promise.all(getData(artists)))
}
getDataAPI(artists).then(data => console.log(data))

/*
 * Basically what we are doing in the getData(artists) function is returning an array of Promises, and each Promise 
 * is a wrapper around an object of the form { id: "ArtistName", associations: [similar artists]  } 
 * In the Higher Order Function getDataAPI(artists), we are calling the getData(artists), which as discovered 
 * earlier, returns an array of Promises. Then, we make use of Promise.all(), which will resolve/reject each Promise in the array. After the 
 * execution completes, it will give us our required data in an array. 
 * Key Point though: An async function always returns a promise. getDataAPI is an async function, so it will return
 * a promise. We can do a .then on it and get our data.
 */
