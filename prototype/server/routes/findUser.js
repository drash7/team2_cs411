//project imports
const express = require('express');
const router = express.Router();
const CONFIG = require('../config/fetchConfigs');
const { v4: uuidv4 } = require('uuid');
const { validate : uuidValidate } = require('uuid');

// redis imports
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');

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
let uuid_input = '9ab2d102-0abc-4558-879d-155e124210dd';

router.get('/', async (req, res, next) => {
    console.log('uuid received');
    let user_exist = await asyncExists(uuid_input);
    let uuid_valid = await uuidValidate(uuid_input);

    // check if uuid is valid and user exist in DB
    if (uuid_valid && user_exist) {

        // account found in the cache, ready to be connected!
        console.log("Your friend found in cache");
        let friend = await asyncGet(uuid_input);

        let userInfo = {
            user: friend,
            uuid : uuid_input,
            cached : true
        }
        res.send(userInfo);
    }

    else {
        res.send("Cannot find a user with provided User Code");
    }



})
















module.exports = router;