const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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