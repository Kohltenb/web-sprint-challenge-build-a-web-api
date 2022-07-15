const express = require('express');
const projRouter = require('./projects/projects-router');
const actionRouter = require('./actions/actions-router');

const server = express();
server.use(express.json()); //UNDER THIS PUPPY

server.use('/api/projects', projRouter)
server.use('/api/actions', actionRouter)



server.get('/', (req, res) => {
    res.send(`<h1> TESTING <h2>`)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!!!`})
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
module.exports = server;
