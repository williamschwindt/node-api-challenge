const express = require('express');
const projectsDB = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {
    
})

router.get('/:id/actions', (req, res) => {
    
})

router.post('/', (req, res) => {
    
})

router.post('/:id/actions', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

const validateProjectID = () => {
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

const validateProjectBody = () => {
    return (req, res, next) => {
        if(!res.body.name || !res.body.description) {
            return res.status(400).json({
                message: 'request body is missing name or description'
            })
        }
        next()
    }
}

const validateActionBody = () => {
    return (req, res, next) => {
        if(!res.body.project_id) {
            return res.status(400).json({
                message: 'request body is missing project_id'
            })
        }
        if(!res.body.description || !res.body.notes) {
            return res.status(400).json({
                message: 'request body is missing description or notes'
            })
        }
        next()
    }
}

module.exports = router;