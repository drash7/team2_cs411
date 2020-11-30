//project imports
const express = require('express');
const router = express.Router();
const CONFIG = require('../config/fetchConfigs');
const { v4: uuidv4 } = require('uuid');

// redis imports
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');

//async returns 0 or 1 : true or false
const asyncSet = promisify(client.set).bind(client);
const asyncGet = promisify(client.get).bind(client);
const asyncExists = promisify(client.exists).bind(client);
const asyncExpire = promisify(client.expire).bind(client);


client.on("error", function (error) {
    console.error(error);
});


/* generating uuid for inviting and adding friends
   uuid version 4, randomly generated uuid
   functionality : click to copy your code */


// lets assume that we ask for username to the user after log-in with spotify
let username = 'yongjinc';


router.get('/', async (req, res, next) => {
    let match = await asyncExists(username);

    //if user has uuid assigned
    if (match) {
        console.log("User found in cache");
        let uuid_exist = await asyncGet(username);
        //let jsonSaved = JSON.parse(data_exist);

        let inCache = {
            user: username,
            cached : true,
            uuid : uuid_exist
        }

        res.send(inCache);

    }

    // not in cache, generate new uuid
    else {
        console.log("Not in cache, generate a new code NOW");
        const user_code = await uuidv4();
        await asyncSet(username, user_code);

        let response = {
            user: username,
            cached: false,
            uuid: user_code
        }

        // change expiration time, one code per one user name?
        await asyncExpire(username, 1000);
        res.send(response);

    }

})







module.exports = router;