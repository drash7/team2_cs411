const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request')
const CONFIG = require('../config/fetchConfigs');


const client_id = CONFIG.fetchOptions.client_id;
const client_secret = CONFIG.fetchOptions.client_secret;
const redirect_uri = CONFIG.fetchOptions.url;


// OAuth for Spotify API


// triggered from front end - log in with spotify
router.route('/login')
    .get((req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: 'user-read-private user-read-email',
                redirect_uri }))
})


//redirect user to spotify login page
router.route('/callback')
    .get((req, res, next) => {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')},
            form: {
                grant_type: 'client_credentials'},
            json: true
        };


        // authorization code received, exchange it with an access token
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let token = body.access_token;
                res.redirect('http://localhost:9000/artist' + '?access_token=' + token);
            }
        });
    });


module.exports = router;
