const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectsDB.get()
        .then(projects => {
            return res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateProjectID(), (req, res) => {
    return res.status(200).json(res.project)
})

router.get('/:id/actions', validateProjectID(), (req, res) => {
    projectsDB.getProjectActions(req.params.id)
        .then(actions => {
            return res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', validateProjectBody(), (req, res) => {
    projectsDB.insert(req.body)
        .then(project => {
            return res.status(201).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/:id/actions', validateActionBody(), validateProjectID(), (req, res) => {
    actionsDB.insert(req.body)
        .then(project => {
            return res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', validateProjectBody(), validateProjectID(), (req, res) => {
    projectsDB.update(req.params.id, req.body)
        .then(project => {
            return res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateProjectID(), (req, res) => {
    projectsDB.remove(req.params.id)
        .then(() => {
            return res.status(204).end()
        })
        .catch(err => {
            next(err)
        })
})

function validateProjectID() {
    return (req, res, next) => {
        projectsDB.get(req.params.id)
            .then(project => {
                if(project) {
                    res.project = project;
                    next();
                } else {
                    return res.status(404).json({
                        message: 'project not found'
                    })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

function validateProjectBody() {
    return (req, res, next) => {
        if(!req.body.name || !req.body.description) {
            return res.status(400).json({
                message: 'request body is missing name or description'
            })
        }
        next()
    }
}

function validateActionBody() {
    return (req, res, next) => {
        if(!req.body.project_id) {
            return res.status(400).json({
                message: 'request body is missing project_id'
            })
        }
        if(!req.body.description || !req.body.notes) {
            return res.status(400).json({
                message: 'request body is missing description or notes'
            })
        }
        next()
    }
}

module.exports = router;