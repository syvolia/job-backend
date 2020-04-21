const express = require('express')
const app = express()


var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
app.get('/', (req, res, next) => res.json({ message: 'Welcome to jobsearch api' }))
app.get('/api/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.send(jobs)
})

app.listen(process.env.PORT || 3001);