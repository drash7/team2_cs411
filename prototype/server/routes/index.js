const express = require('express');
const router = express.Router();

const querystring = require('querystring');
const request = require('request')
const CONFIG = require('../config/fetchConfigs');
const UUID = require('./redisDatabase');

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
        await request.post(authOptions, async function(error, response, body) {

            if (!error && response.statusCode === 200) {
                // store access token here!
                const build = {};
                let access_token = body.access_token;
                build.access_token = access_token;

                // fetching user profile information
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + access_token},
                    json: true
                };

                // storing the user profile information and generating UUID
                await request.get(options, async function(error, response, body) {
                    let username = await body.id;
                    let userInfo = await UUID.generateCode(username);

                    build.user = userInfo;          // internal generated uuid
                    build.spotify = body;           // spotify account data

                    let storeData = await UUID.callDatabase(userInfo.uuid , build);

                    res.redirect('http://localhost:3000/dashboard' + '?access_token=' + access_token);
                    console.log(access_token);
                    //res.send(build);
                });



                // // spotify top artist information
                // const top_artist = {
                //     url: 'https://api.spotify.com/v1/me/top/artists',
                //     headers: {'Authorization': 'Bearer ' + access_token},
                //     json: true
                // };


                // spotify top artist fetched
                // await request.get(top_artist, async function(error, response, body) {
                //     //here
                //     let uuid = await build.user.uuid;
                //
                //     build.top_artist = await body;
                //     let storeData = await UUID.callDatabase(uuid , build);
                //     console.log(storeData);

                    // res.render('middleware', {
                    //     "user": build.user,
                    //     "spotify": build.spotify,
                    //     "result": build.top_artist,
                    //     "token": build.access_token
                    // });
                // });

                // res.send('/artist' + querystring.stringify(
                //     {
                //         access_token: access_token,
                //         //refresh_token: refresh_token
                //     }));


            // No access granted
            } else {
                //res.send(errors)
                res.redirect('/#' + querystring.stringify({error: 'invalid_token'}));
            }
        });
    })




module.exports = router;
