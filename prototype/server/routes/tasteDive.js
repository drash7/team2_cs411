const express = require('express');
const router = express.Router();
const CONFIG = require('../config/fetchConfigs');
const fetch = require('node-fetch');

const access_key = CONFIG.tasteDive.access_key;


function fetchData(){
    fetch(`https://tastedive.com/api/similar?q=Billie Eilish&info=1&k=${access_key}`)
        .then(response => {
            return response.json();
        }).then(data => {
        const x = data.Similar;
        console.log(x);
    });
}

fetchData();








module.exports = router;