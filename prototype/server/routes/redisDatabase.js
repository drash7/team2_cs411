//project imports
const {v4: uuidv4} = require('uuid');

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


/* generating uuid for inviting and adding friends
   uuid version 4, randomly generated uuid
   functionality : click to copy your code */

client.on("error", function (error) {
    console.error(error);
});


/* simple Redis Cache Database for storing username and uuid as key value pair
   function returns data object with username, uuid and cache status
   This is our WEBSITE generated data set */

const generateCode = async username => {
    console.log("Function called: generateCode");

    //check if user already has uuid generated
    let user_exist = await asyncExists(username);

    //if user has uuid assigned
    if (user_exist) {
        console.log("User already has uuid assigned");
        let get_code = await asyncGet(username);
        const user = {
            username: username,
            uuid: get_code,
        }
        return user;
    }

    // not in cache, generate new uuid
    else {
        console.log("Not found in cache, generate new id");
        const user_code = uuidv4();                 // generate new uuid

        // user id and username pair
        await asyncSet(username, user_code);
        let user = {
            username: username,
            uuid: user_code,
        }

        // this is for testing purpose
        // change expiration time, one code per one user name?
        //await asyncExpire(username, 100000);
        return user
    }
}


/* Redis Cache Database for storing formatted JSON data
   JSON data contains our website + spotify user account data
   this function will be called inside index.js file */

const callDatabase = async (uuid, data = {}) => {
    console.log("Function called: storeUserInfo");

    //store User data passed in from spotify and UUID generated
    const jsonCache = new JSONCache(redisDB);
    let match = await asyncExists(uuid);

    if (match) {
        console.log("UUID found in database");

    } else {
        await asyncSet(uuid, "in Database");
        await jsonCache.set(uuid, data);
        console.log("Store user data in redis database");
    }
    const result = await jsonCache.get(uuid)
    console.log('res',result);
    debugger
    return result;
}



module.exports = {generateCode, callDatabase};
