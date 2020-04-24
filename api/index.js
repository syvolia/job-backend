const express = require('express')
const app = express()

const redis = require("redis")
let redisClient
if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL)
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