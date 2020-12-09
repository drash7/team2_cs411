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
