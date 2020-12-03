//project imports
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


//function returns JSON data object with username, uuid and cache status
const getUserInfo = async username => {

    //check if user already has uuid generated
    let user_exist = await asyncExists(username);

    //if user has uuid assigned
    if (user_exist) {
        console.log("User found in cache");
        let get_code = await asyncGet(username);

        const userInfo = {
            user: username,
            uuid : get_code,
            cached: true

        }
        return userInfo;
    }

    // not in cache, generate new uuid
    else {
        console.log("Not in cache, generate add to DB");
        const user_code = uuidv4();                 // generate new uuid
        await asyncSet(username, user_code);
        await asyncSet(user_code, username);        // used later to find user using uuid

        let userInfo = {
            user: username,
            uuid: user_code,
            cached: false
        }

        await asyncExpire(username, 1000);
        await asyncExpire(user_code,1000)
        // change expiration time, one code per one user name?
        return userInfo
    }
}




module.exports = {getUserInfo};