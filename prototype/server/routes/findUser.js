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

const findFriend = async uuid_input => {

    let user_exist = await asyncExists(uuid_input);
    let uuid_valid = await uuidValidate(uuid_input);

    // account found in the cache, ready to be connected!

    if (uuid_valid && user_exist) {
        console.log("Your friend uuid is found");
        const friend_result = await UUID.callDatabase(uuid_input, null);
        let cache_flag = await asyncGet(uuid_input);

        //console.log(cache_flag);
        //console.log(friend_result);

    } else {
        // User not Found, direct to error page
        return("error");

    }
}


module.exports = {findFriend};
