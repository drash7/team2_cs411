const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request')

const client_id = 'ff2fa4499ed0455ba2b78579db1b13de';
const client_secret = 'f1a7b8253fb2493c8089e86287b06453';
const redirect_uri = 'http://localhost:9000/callback';


// OAuth for Spotify API
router.route('/login')
    .get((req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: 'user-read-private user-read-email',
                redirect_uri }))
})

//redirect user to login page
router.route('/callback')
    .get((req, res) => {
        const code = req.query.code || null
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + Buffer.from(
                  (client_id + ':' + client_secret).toString('base64')
              )},
            json: true
          }

  //go to the main page on FRONT-end
  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token
    const uri = 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})


// GET home page
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
