const router = require('express').Router()

//Load input validation
const validateIssueInput = require('../validation/issue')
const validateSubmitInput = require('../validation/submitIssue')

//Load project model
const Issue = require('../models/Issue')

// @route   POST api/issues/:user/:project/:issue
// @desc    Create new issue
// @access  Private

router.post('/:user/:project/:issue', (req, res) => {
    //Form validation
    const { errors, isValid } = validateSubmitInput(req.body)
    //return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        //check DB by title
        Issue.findOne({ user: req.params.user, project: req.params.project, title: req.body.issue_title }).then(issue => {
            if (issue) {
                res.status(400).json({ title: 'That issue already exists'})
            } else {
                const newIssue = new Issue({
                    user: req.params.user,
                    project: req.params.project,
                    issue_title: req.body.issue_title,
                    issue_text: req.body.issue_text,
                    created_on: new Date(),
                    created_by: req.body.created_by,
                    assigned_to: req.body.assigned_to || '',
                    status_text: req.body.status_text || ''
                })

                //save the project in the DB
                newIssue
                    .save()
                    .then(issue => res.json(issue))
                    .catch(err => console.log(err))
            }
        })
    }
})

// @route   POST api/issues/:user/:project
// @desc    Blank form submit error
// @access  Private

router.post('/:user/:project', (req, res) => {
    res.status(400).json({issue_title_submit: 'An issue title, description, and creator are required'})
})

// @route   GET api/issues/:user/:project
// @desc    get an array of all issues for the project
// @access  Private

router.get('/:user/:project', (req, res) => {
    Issue
        .find({user: req.params.user, project: req.params.project})
        .sort({ updated_on: -1 })
        .then(issues => res.json(issues))
})

// @route   GET api/issues/:user/:project/:id
// @desc    get a single issue
// @access  Private

router.get('/:user/:project/:id', (req, res) => {
    Issue
        .findById(req.params.id)
        .then(issue => res.json(issue))
})

// @route   DELETE api/issues/:id
// @desc    Delete an issue
// @access  Private

router.delete('/:user/:project/:id', (req, res) => {
    Issue
        .findById(req.params.id)
        .then(issue => issue.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

// @route   DELETE api/issues
// @desc    Delete all issues in a project
// @access  Private

router.delete('/:user/:project', (req, res) => {
    Issue
        .deleteMany({ project: req.params.project, user: req.params.user })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
})

// @route   PUT api/issues/:user/:project/:id
// @desc    Edit an issue
// @access  Private

router.put('/:user/:project/:id', (req, res) => {
    //Form validation
    const { errors, isValid } = validateIssueInput(req.body)

    //return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        const search = {
            _id: req.params.id,
            project: req.body.project,
            user: req.body.user
        }
        const update = {
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to || '',
            status_text: req.body.status_text || '',
            updated_on: req.body.updated_on
        }
        Issue
            .findOneAndUpdate(search, update, { new: true })
            .then(issue => res.json(issue))
            .catch(err => console.log(err))
    }
})

// @route   PUT api/issues/:user/:project/:id/close
// @desc    Close an issue
// @access  Private

router.put('/:user/:project/:id/close', (req, res) => {
    const search = {
        _id: req.params.id,
        project: req.body.project,
        user: req.body.user
    }
    const update = {
        open: req.body.open
    }
    Issue
        .findOneAndUpdate(search, update, { new: true })
        .then(issue => res.json(issue))
        .catch(err => console.log(err))
})

module.exports = router