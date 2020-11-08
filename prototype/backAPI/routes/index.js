const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');
const CONFIG = require('../config/fetchConfigs');


const redirect_uri = process.env.REDIRECT_URI || CONFIG.fetchOptions.redirect_url;


// app requests authorization; the user logs in and authorizes access
router.route('/login')
    .get( (req, res) => {
      res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: CONFIG.fetchOptions.my_client_id,
            scope: 'user-top-read',
            redirect_uri
          }))
})


// app requests access token; spotify returns access
router.route('/callback')
    .get((req, res) => {
      const code = req.query.code || null
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri,
          grant_type: 'authorization_code'  },
        headers: {
          'Authorization': 'Basic ' + (
              Buffer.from(
                  CONFIG.fetchOptions.my_client_id + ':' +CONFIG.fetchOptions.client_id_secret).toString('base64')) },
        json: true
  }


  request.post(authOptions, function(error, response, body) {
    const access_token = body.access_token
    const uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})




module.exports = router;

