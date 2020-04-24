const express = require('express')
const app = express()
require('dotenv').config()
const redis = require("redis")
let client
if (process.env.REDIS_URL) {
    client = redis.createClient(process.env.REDIS_URL)
    // Run on server otherwise.
} else {
    redisClient = redis.createClient()
}


const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
app.get('/', (req, res, next) => res.json({ message: 'Welcome to jobsearch api' }))
app.get('/api/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.send(jobs)
})

app.listen(process.env.PORT || 3001);