// add middlewares here related to projects
const { get, } = require('./projects-model');
// insert, update, remove, getProjectActions,

const checkProjectId = (req, res, next) => {
    // console.log('checkHubId');
    // next();
    get(req.params.id)
    .then(proj => {
        if(proj) {
            req.proj = proj;
            next();
        } else {
            next({ status: 400, message: `hub ${req.params.id} not found`});
        }
    })
    .catch(next);
}
const checkProjectValues = (req, res, next) => {
   
}

// get(req.params.id) 
// .then(proj => {
//     const { name, description, completed} = req.body
//     if(proj != name || description || completed) {
//         update(proj, req.body)
//         .then(proj => {
//             res.status(200).json(proj)
//             next()
//         })
//     } else {
//         res.status(400).json({
//             message: 'no no no no'
//         })
//     }
// })
// .catch(next)


module.exports = { checkProjectId, checkProjectValues }
