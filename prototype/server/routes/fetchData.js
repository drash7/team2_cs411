//project imports
const express = require('express');
const router = express.Router();
const request = require('request')
const fetch = require('node-fetch');
const CONFIG = require('../config/fetchConfigs');

// redis imports
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');

const client_id = CONFIG.fetchOptions.client_id;
const client_secret = CONFIG.fetchOptions.client_secret;

//async returns 0 or 1 : true or false
const asyncSet = promisify(client.set).bind(client);
const asyncGet = promisify(client.get).bind(client);
const asyncExists = promisify(client.exists).bind(client);
const asyncExpire = promisify(client.expire).bind(client);


client.on("error", function (error) {
    console.error(error);
});

//url: 'https://api.spotify.com/v1/me/top/artists'

router.route('/')
    .get(async (req, res, next) => {
        let accessToken = req.query.access_token
        //console.log(accessToken);

        const options = {
            url: 'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
        };

        request.get(options, function(error, response, body) {
            res.send(body);
            console.log(body);
        });
    })


module.exports = router;