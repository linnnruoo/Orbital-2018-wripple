const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// load input validations
const validateRegisterInput = require('../../validation/register_new_user');
const validateLoginInput = require('../../validation/login');

// Load fields
const User = require('../../models/User');
const Profile = require('../../models/Profile');


// @route Post api/users/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email : req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(404).json(errors);
            } else {
                /*const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default size
                });
                */
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    university: req.body.university,
                    email: req.body.email,
                    //avatar,
                    password: req.body.password
                });

                // hashing of password
                // salt round = 10
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
                
            }
        })
        .catch(err => console.log(err));
});
 
// @route Post api/users/login
// @desc user login + return jwt token
// @access Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    // input entered by clients
    const email = req.body.email; 
    const password = req.body.password;
    
    // find user by email
    User.findOne({email})
        .then(user => {
            // check for valid user
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // cretae jwt payload
                        const payload = {id: user.id, first_name: user.first_name, last_name: user.last_name, university: user.university}
                        
                        // sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token)=> {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                });
                            }
                        );
                    
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
                .catch(err => console.log(err));
        
        })
        .catch(err => console.log(err));
});

module.exports = router;