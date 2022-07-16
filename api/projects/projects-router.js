// Write your "projects" router here!
const express = require('express')
const {checkProjectId, } = require('./projects-middleware')
const Projects = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get(req.params.id)
        .then(entry => {
            res.status(200).json(entry)
        }).catch(next)
})

router.get('/:id', async (req, res, next) => {  //passing but not working correctly?
    try {
        const idProj = await Projects.get(req.params.id)
        if (!idProj) {
            res.status(404).json({
                message: "The entry with the specified ID does not exist"
            })
        } else {
            return res.json(idProj)
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', (req, res, next) => { //working but not passing
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(400).json({
            message: 'input field invalid'
        })
    } else {
        Projects.insert(req.body)
            .then(proj => {
                res.status(201).json(proj);
            })
            .catch(next);
    }
})

// router.put('/:id', checkProjectId, (req, res, next) => {
//     const { name, description, completed} = req.body
//     Projects.update(req.params.id, req.body)
//     .then(proj => {
//       if (proj != name || description || completed) {
//         res.status(200).json(proj);
//       } else {
//         res.status(400).json({ message: 'The hub could not be found' });
//       }
//     })
//     .catch(next);
// })

// router.put('/:id', (req, res, next) => {
//     const {name, description, completed} = req.body
//     Projects.get(req.params.id)
//     .then(proj => {
//         if(proj === name || description || completed) {
//             res.status(400).json({
//                 message: 'no no no no'
//             }) .catch(next)
//         } else {
//             Projects.update(proj, req.body)
//             .then(proj => {
//                 res.status(200).json(proj)
//             }) .catch(next)
//         }
//     })
// })

router.put('/:id', (req, res, next) => {
    const { name, description, completed } = req.body
    if (!name || !description || req.body === completed) { //i= just swaps the passing test
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Projects.get(req.params.id)
            .then(stuff => {
                if (!stuff) {
                    res.status(404).json({
                        message: 'The Projects with the specified ID does not exist'
                    })
                } else {
                    return Projects.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return Projects.get(req.params.id)
                }
            })
            .then(post => {
                res.json(post)
            }) .catch(next)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: 'no no no no'
            })
        } else {
            await Projects.remove(req.params.id)
            res.json(project)
        }
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(result => {
        if(result === null) {
            res.status(200).json([])
        } else {
            res.status(200).json(result)
        }
    }) 
})



// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        custom: 'ITS ALL BROKEN',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router