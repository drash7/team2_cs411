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


router.route('/')
    .get(async (req, res, next) => {
        let accessToken = req.query.access_token
        const options = {
            method: 'GET',
            headers: {  Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}` }
        };

        const url = 'https://api.spotify.com/v1/users/jmperezperez';
        const rawData = await fetch(url, {options});
        const jsData = await rawData.json();
        console.log(jsData);

        // request.get(options, function (error, response, body) {
        //     //console.log(body);
        //     res.send(body);
        // });

    })


module.exports = router;