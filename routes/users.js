//const express = require('express')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = process.env.PASSPORT_SECRET || require('config').get('Config.passport')

//Load input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

//Load user model
const User = require('../models/User')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
    //Form validation
    const { errors, isValid } = validateRegisterInput(req.body)

    //return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        //check DB by email
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                res.status(400).json({ email: 'Email is already in use'})
            } else {
                User.findOne({ name: req.body.name }).then(user => {
                    if (user) {
                        res.status(400).json({ email: 'Username is already in use'})
                    } else {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        })

                        //Hash the password
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err
                                newUser.password = hash
                                newUser
                                    .save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err))
                            })
                        })
                    }
                })
            }
        })
    }
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
    //Validate the form
    const { errors, isValid } = validateLoginInput(req.body)

    //Return errors if invalid
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        const email = req.body.email,
            password = req.body.password

        //Find user by email
        User.findOne({ email }).then(user => {
            if (!user) {
                res.status(404).json({ emailnotfound: 'Email not found' })
            }
            
            //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    }

                    //Sign token
                    jwt.sign(
                        payload,
                        keys,
                        { expiresIn: 31556926 }, //One year in seconds
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                } else {
                    res.status(400).json({ passwordincorrect: 'Incorrect password'})
                }
            })
        })
    }
})

module.exports = router

