// Write your "actions" router here!
const express = require('express')
// const {} = require('./actions-middleware')

const Actions = require('./actions-model')

const actionRouter = express.Router();

actionRouter.get('/', (req, res, next) => {
    Actions.get(req.params.id)
    .then(act => {
        res.json(act)
    })
    .catch(next)
})

actionRouter.get('/:id', async (req, res, next) => {  //passing but not working correctly?
    try {
        const idAct = await Actions.get(req.params.id)
        if (!idAct) {
            res.status(404).json({
                message: "The entry with the specified ID does not exist"
            })
        } else {
            return res.json(idAct)
        }
    } catch (err) {
        next(err)
    }
})


actionRouter.post('/', (req, res, next) => { //working but not passing
    const { notes, description, project_id } = req.body
    if (!notes || !description || !project_id) {
        return res.status(400).json({
            message: 'input field invalid'
        })
    } else {
        Actions.insert(req.body)
            .then(act => {
                res.status(201).json(act);
            })
            .catch(next);
    }
})


actionRouter.put('/:id', async (req, res, next) => {
    try {
        const { notes, description, project_id, completed } = req.body
        const possibleId = await Actions.get(req.params.id)
        if (!possibleId) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',
            })
        } else {
            if (!notes || !description || !project_id ) {
                res.status(400).json({
                    message: 'no no no no no',
                })
            } else {
                const updated = await Actions.update(req.params.id, req.body )
                res.status(200).json(updated)
            }
        }
    } catch (err) {
        next(err)
    }
})

// actionRouter.put('/:id', (req, res, next) => {
//     const { name, description, project_id } = req.body
//     if (!name || !description || !project_id) { //i= just swaps the passing test
//         res.status(400).json({
//             message: "Please provide title and contents for the post"
//         })
//     } else {
//         Actions.get(req.params.id)
//             .then(stuff => {
//                 if (!stuff) {
//                     res.status(404).json({
//                         message: 'The Actions with the specified ID does not exist'
//                     })
//                 } else {
//                     return Actions.update(req.params.id, req.body)
//                 }
//             })
//             .then(data => {
//                 if (data) {
//                     return Actions.get(req.params.id)
//                 }
//             })
//             .then(post => {
//                 res.json(post)
//             }) .catch(next)
//     }
// })

actionRouter.delete('/:id', async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'no no no no'
            })
        } else {
            await Actions.remove(req.params.id)
            res.json(action)
        }
    } catch(err) {
        next(err)
    }
})




actionRouter.use((err, req, res, next) => {
    // console.log(res.promises)
    res.status(err.status || 500).json({
        custom: 'THIS SHIT IS STUPID',
        message: err.message,
        stack: err.stack
    })
})

module.exports = actionRouter