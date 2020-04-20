const express = require('express');
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionsDB.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateActionID(), (req, res) => {
    actionsDB.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', validateActionBody(), validateActionID(), (req, res) => {
    actionsDB.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateActionID(), (req, res) => {
    actionsDB.remove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => {
            next(err)
        })
})

function validateActionID() {
    return (req, res, next) => {
        actionsDB.get(req.params.id)
            .then(action => {
                if(action) {
                    res.action = action;
                    next();
                } else {
                    return res.status(404).json({
                        message: 'action not found'
                    })
                }
            })
            .catch(err => {
                next(err);
            })
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