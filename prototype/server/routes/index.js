const express = require('express');
const router = express.Router();

const querystring = require('querystring');
const request = require('request')
const fetch = require('node-fetch')
const CONFIG = require('../config/fetchConfigs');
const DB = require('./redisDatabase');

const client_id = CONFIG.fetchOptions.client_id;
const client_secret = CONFIG.fetchOptions.client_secret;
const redirect_uri = CONFIG.fetchOptions.url;


/* OAuth for Spotify API
   triggered from front end - log in with spotify  */

const scope = 'user-top-read user-read-private user-read-email playlist-modify-public';

router.route('/login')
    .get((req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
            }))
    })



//redirect user to spotify login page
router.route('/callback')
    .get(async (req, res) => {
        const code = req.query.code || null;

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            json: true
        };



        //Spotify API: retrieve data from Spotify API
        request.post(authOptions, async function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // store access token here!
                const build = {};
                let access_token = body.access_token;
                build.access_token = access_token;

                // fetching user profile information
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // storing the user profile information and generating UUID
                request.get(options, async function (error, response, body) {
                    let username = await body.id;
                    let userInfo = await DB.generateCode(username);

                    build.user = userInfo;          // internal generated uuid
                    build.spotify = body;           // spotify account data

                    const top_artists_url = 'https://api.spotify.com/v1/me/top/artists?limit=50';
                    const top_tracks_url = 'https://api.spotify.com/v1/me/top/tracks?limit=25';                    

                    const top_options = {
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };

                    // spotify top artist fetched
                    // request.get(top_artist, async function (error, response, body) {
                    //     const data = await body;
                    //     build.top_artist = data.items;
                    // });
                    const top_artists_response = await fetch(top_artists_url, options);
                    const top_artists_data = await top_artists_response.json();
                    build.top_artists = top_artists_data.items;

                    // spotify top tracks fetched
                    // request.get(top_tracks, async function (error, response, body) {
                    //     const data = await body;
                    //     build.top_tracks = data.items;
                    //     console.log(build);
                    // });
                    const top_tracks_response = await fetch(top_tracks_url, options);
                    const top_tracks_data = await top_tracks_response.json();
                    build.top_tracks = top_tracks_data.items;

                    let storeData = await DB.callDatabase(userInfo.uuid, build);

                    const { country, email, id: userId, display_name, images} = body;
                    const q = { access_token, username: display_name, userId, country, email, image: images[0].url };
                    q.UUID = userInfo.uuid;
                    //  querystring.stringify({ UUID, access_token, username: display_name, userId, country, email }))
                    res.redirect('http://localhost:3000/dashboard?' + querystring.stringify(q));

                    //res.send(build);
                });

                // res.send('/artist' + querystring.stringify(
                //     {
                //         access_token: access_token,
                //         //refresh_token: refresh_token
                //     }));


                // No access granted
            } else {
                //res.send(errors)
                res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
            }
        });
    })




module.exports = router;
