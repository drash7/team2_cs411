//project imports
const express = require('express');
const router = express.Router();
const request = require('request')
const fetch = require('node-fetch');
const CONFIG = require('../config/fetchConfigs');
const UUID = require('./userCode');

// redis imports
const redis = require('redis');
const client = redis.createClient();


client.on("error", function (error) {
    console.error(error);
});


// Spotify API: get top artists and track of user
router.route('/')
    .get(async (req, res, next) => {
        let accessToken = await req.query.access_token

        const options = {
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


module.exports = router;