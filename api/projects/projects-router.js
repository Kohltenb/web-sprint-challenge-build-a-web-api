// Write your "projects" router here!
const express = require('express')
// const {} = require('./projects-middleware')

const projects = require('./projects-model')

const router = express.Router();

router.get('/api/projects', (req, res) => {
   projects.get()
   .then(projs => {
    res.status(200).json(projs)
   })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'ITS ALL BROKEN',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router