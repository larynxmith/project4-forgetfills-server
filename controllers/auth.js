let router = require('express').Router()
let db = require('../models')
require('dotenv').config()
let jwt = require('jsonwebtoken')

//POST /auth/login (find/validate use; send token)
router.post('/login', (req, res) => {
    // find user by email in db
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // check for user and password
        if(!user || !user.password) {
            return res.status(404).send({ message: 'User Not Found'})
        }
        // Yes, user exists; check password
        if(!user.isAuthenticated(req.body.password)) {
            //Invalid credentials: wrong password
            return res.status(406).send({ message: 'Not Acceptable: Invalid Credentials'})
        }
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 *60 * 8 //8 hours in seconds
        })
        res.send({ token })
    })
    .catch(err => {
        // db/db setup issue, or typo
        console.log('Error in POST /auth/login', err)
        res.status(503).send({ message: 'Oops, something on our side is off. Or you made a typo. Good Luck.' })
    })
})

// POST /auth/signup(vreate user, generate token)
router.post('/signup', (req, res) => {
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // IF user exists, do NOT let them create a duplicate account
        if (user) {
            return res.status(409).send({ message: 'Email address already in use' })
        }
        //Good - user doesn't exist yet
        db.User.create(req.body)
        .then(newUser => {
            // user created, let's assign them a token
            let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 8// (8 hours in seconds)
            })
            res.send({ token })
        })
        .catch(err => {
            console.log('Error while creting new user', err)
            res.status(500).send({ message: 'Error creating new user' })
        })
    })
    .catch(err => {
        console.log('Error in POST /auth/signup', err)
        res.status(503).send({ message: 'Oops, something on our side is off. Or you made a typo. Good Luck.'})
    })
})

// NOTE: User should be logged in to process this route
router .get('/current/user', (req, res) => {
    if (!req.user || !req.user._id) {
    return res.status(417).send({ message: ' Expetation Failed: Check Configuration '})
    }

    //NOTE: this is the user data from the time token was issued
    // WARNING: If you update the user info those changes will not be reflected here 
    // To avoid this, reissue a token when you update user data
    res.send({ user: req.user })
    
})

module.exports = router