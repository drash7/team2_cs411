const express = require('express');
const router = express.Router();
const CONFIG = require('../config/fetchConfigs');
const fetch = require('node-fetch');

const access_key = CONFIG.tasteDive.access_key;

//Need to retrieve artist from elsewhere, based on user's shared artist interests
//const artist = graph.node.artist (pseudocode example of how the artist variable should operate)

const artist = "Billie Eilish";

async function fetchData(){
    fetch(`https://tastedive.com/api/similar?q=${artist}&info=1&k=${access_key}`)
        .then(response => {
            return response.json();
        }).then(data => {
        const x = data.Similar;
        console.log(x);
    });
}

fetchData();








module.exports = router;
