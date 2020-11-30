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



/* generating uuid for inviting and adding friends
   uuid version 4, randomly generated uuid
   functionality : click to copy your code */


client.on("error", function (error) {
    console.error(error);
});


//testing values
const user_code = uuidv4();     // on click generate new cod
const username = 'yongjinc';    // ask for username after log-in with spotify from front-end


router.get('/', async (req, res, next) => {
    let user_exist = await asyncExists(user_code);

    //if user has uuid assigned
    if (user_exist) {
        console.log("User found in cache");
        let getUsername = await asyncGet(user_code);
        //let jsonSaved = JSON.parse(data_exist);

        let inCache = {
            user: getUsername,
            uuid : user_code,
            cached : true
        }
        res.send(inCache);
    }

    // not in cache, generate new uuid
    else {
        console.log("Not in cache, generate add to DB");
        await asyncSet(user_code, username);

        let userInfo = {
            user: username,
            uuid: user_code,
            cached: false
        }

        // change expiration time, one code per one user name?
        await asyncExpire(user_code, 1000);
        res.send(userInfo);
    }
})


module.exports = router;