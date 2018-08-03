const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const registerInputValidation = require('../validation/register');
const loginInputValidation = require('../validation/login');

const User = require('../models/User');

router.get('/users', function (req, res) {
    User.find()
        .then(guests => res.json(guests))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/users', function (req, res) {
    User.create(req.body)
        .then(m => res.json(m))
        .catch(err => res.status(500).json({error: err}))
});

router.delete('/users/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(m => res.status(204).json('OK'))
        .catch(err => res.status(500).json({error: err}))
});

router.patch('/users/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(m => res.json(m))
        .catch(err => res.status(500).json({error: err}))
});

router.post('/users/register', (req, res) => {
    const { errors, isValid } = registerInputValidation(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user)
                return res.status(400).json({email: 'Email already exists'});

            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.error(err))
                })
            })
        })
});

router.post('/users/login', (req, res) => {
    const { errors, isValid } = loginInputValidation(req.body);

    const email = req.body.email;
    const password = req.body.password;

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json({email: 'User not found'});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {

                        const payload = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            avatar: user.avatar
                        };

                        const today = new Date();
                        const expiresIn= new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 0, 0, 0);

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: expiresIn - today }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json({password: 'Password incorrect :('})
                    }
                })
        })
});

router.get('/users/current', passport.authenticate('jwt', { session: false }), (req, res) => {+
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        secondName: req.user.secondName,
        email: req.user.email
    })
});

router.get('/users/:id', function (req, res) {
    User.findById(req.params.id)
        .then(m => res.json(m))
        .catch(err => res.status(500).json({error: err}))
});

module.exports = router;