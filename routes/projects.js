const router = require('express').Router()

//Load input validation
const validateProjectInput = require('../validation/project')
const validateShareInput = require('../validation/share')

//Load project model
const Project = require('../models/Project')
const User = require('../models/User')

// @route   POST api/dashboard/:user/
// @desc    Create new project
// @access  Private

router.post('/:user', (req, res) => {
    //Form validation
    const { errors, isValid } = validateProjectInput(req.body)

    //return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        //check DB by title
        Project.findOne({ user: req.params.user, title: req.body.title }).then(project => {
            if (project) {
                res.status(400).json({ title: 'That project already exists'})
            } else {
                const newProject = new Project({
                    user: req.params.user,
                    title: req.body.title
                })

                //save the project in the DB
                newProject
                    .save()
                    .then(project => res.json(project))
                    .catch(err => console.log(err))
            }
        })
    }
})

// @route   GET api/dashboard/:user
// @desc    get an array of all projects created by a user
// @access  Private

router.get('/:user', (req, res) => {
    Project
        .find({user: req.params.user})
        .sort({ created_on: -1 })
        .then(projects => res.json(projects))
})

// @route   DELETE api/dashboard/:id
// @desc    Delete a project
// @access  Private

router.delete('/:id', (req, res) => {
    Project.findById(req.params.id)
      .then(project => project.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }))
  })

// @route   GET api/dashboard/shared/:user
// @desc    get an array of all projects shared with user
// @access  Private

router.get('/shared/:user', (req, res) => {
    Project
        .find({collaborators: req.params.user})
        .sort({ created_on: -1 })
        .then(sharedProjects => res.json(sharedProjects))
})

// @route   PUT api/dashboard/:project/:collaborator/:id
// @desc    Share a project
// @access  Private

router.put('/:project/:collaborator/:id', (req, res) => {
    //Form validation
    const { errors, isValid } = validateShareInput(req.body)

    //return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        User.findOne({ name: req.body.collaborator }).then(user => { // search users by the entry
            if (!user) {
                res.status(400).json({ exist: 'That user does not exist'})
            } else {
                const search = { // search projects by user and collaborator
                    user: req.body.user, 
                    collaborators: req.params.collaborator, 
                    title: req.params.project 
                } 
                Project.findOne(search).then(project => {
                    if (project) {
                        res.status(400).json({ already: 'That user is already collaborating on this project'})
                    } else {
                        Project
                            .findOneAndUpdate( 
                                { _id: req.params.id }, 
                                { $push: { collaborators: req.params.collaborator } }, 
                                { new: true }
                            )
                            .then(res.json({ success: `Successfully shared with ${req.params.collaborator}`, id: req.params.id }))
                            .catch(err => console.log(err))
                    }  
                }) 
            }
        })
    }
})

// @route   PUT api/dashboard/:project/:id
// @desc    Blank form submit error
// @access  Private 

router.put('/:project/:id', (req, res) => {
    res.status(400).json({collaborator: 'A username is required'})
})

// @route   PUT api/dashboard/leave/:project/:collaborator/:id
// @desc    Leave a project
// @access  Private

router.put('/leave/:project/:collaborator/:id', (req, res) => {
    const search = { _id: req.params.id } // search projects by id
    Project
        .findOneAndUpdate( search, 
            { $pull: { collaborators: req.body.collaborator } }, 
            { new: true }
        )
        .then(res.json({ leave: `Successfully left ${req.params.project}`, id: req.params.id }))
        .catch(err => console.log(err))
})

// @route   GET api/dashboard/permission/:user/:project
// @desc    get the project to determine if the user has permission
// @access  Private

router.get('/permission/:user/:project', (req, res) => {
    Project
        .findOne({   
            $and: [
                { $or: [{ user: req.params.user }, { collaborators: req.params.user}] },
                { title: req.params.project }
            ]
        })
        .then(project => {
            if (!project) {
                res.status(401).json({ permission: 'You do not have permission to view this project' })
            } else {
                res.json(project)
            }
        })
        .catch(err => console.log(err))
})

// @route   GET api/dashboard/collaborators/:user
// @desc    get an array of all collaborators on a project
// @access  Private

router.get('/collaborators/:id', (req, res) => {
    Project
        .findById(req.params.id)
        .then(project => res.json(project))
})


module.exports = router