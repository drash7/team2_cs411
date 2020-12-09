//project imports
const express = require('express');
const router = express.Router();
const { validate : uuidValidate } = require('uuid');
const UUID = require('./redisDatabase');


// redis imports
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');

//redis-json imports
const Redis = require('ioredis');
const JSONCache = require('redis-json');
const redisDB = new Redis();

//async returns 0 or 1 : true or false
const asyncSet = promisify(client.set).bind(client);
const asyncGet = promisify(client.get).bind(client);
const asyncExists = promisify(client.exists).bind(client);
const asyncExpire = promisify(client.expire).bind(client);



/* using generated uuid to connect with friends
   uuid version 4, randomly generated uuid
   functionality : bridge a friend enter your friend's code */

client.on("error", function (error) {
    console.error(error);
});


// take uuid as an input through get or post request query from front-end
let uuid_input = '96583f1e-3d1e-4ddd-ba59-0725935f71ae';


router.get('/', async (req, res) => {
    // take uuid as an input through get or post request query from front-end
    console.log('uuid received');

    // const uuid = req.body.uuid;
    // check if uuid is valid and user exist in DB
    let user_exist = await asyncExists(uuid_input);
    let uuid_valid = await uuidValidate(uuid_input);

    // account found in the cache, ready to be connected!
    if (uuid_valid && user_exist) {
        console.log("Your friend uuid is found");
        const friend_result = await UUID.storeUserInfo(uuid_input, null);
        let cache_flag = await asyncGet(uuid_input);
        console.log(cache_flag);
        res.send(friend_result);
        console.log(friend_result);
    }
    else {
        // User not Found, direct to error page
        res.send('Cannot find a user with provided User Code');
        // throw alert to front or display msg
    }



})


module.exports = router;
