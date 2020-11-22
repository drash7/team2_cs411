//project imports
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request'); // "Request" library
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


// your application requests authorization
const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + Buffer.from(
            client_id + ':' + client_secret).toString('base64')},
    form: {
        grant_type: 'client_credentials'},
    json: true
};


client.on("error", function (error) {
    console.error(error);
});

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
            url: 'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            console.log(body);
        });
    }
});

//
// router.route('/')
//     .get((req, res) => {
//     let test_response = {
//         display: true,
//         value: "0"
//     }
//     res.send(test_response);
//
// })





module.exports = router;