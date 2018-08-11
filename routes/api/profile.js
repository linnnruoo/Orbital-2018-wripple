const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

// @route Get api/profile/user/current
// @desc get current logged in user profile
// @access private
router.get('/user/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['last_name', 'first_name', 'university'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'Profile: NULL';
                return res.status(404).json(errors.noprofile);
            }
            
            res.json(profile);
            
        })
        .catch(err => res.statusMessage(404).json(err));
});

// @route Get api/profile/user/:user_id
// @desc get profile of an individual user
// @access private / public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['last_name', 'first_name', 'university'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

// @route Post api/profile/user/current
// @desc create / edit current logged in user's profile
// @access Private
router.post('/user/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.major) profileFields.major = req.body.major;
    if (req.body.about_me) profileFields.about_me = req.body.about_me;
    if (req.body.interests) profileFields.interests = req.body.interests;
    if (req.body.specialization) profileFields.specialization = req.body.specialization;
    if (req.body.skills) profileFields.skills = req.body.skills;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                //update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                )
                .then(profile => {res.json(profile)});
            } else {
                //Create
                new Profile(profileFields).save().then(profile => res.json(profile));
          
            }
        });
});

// @route Post api/profile/user
// @desc pre-populate current logged in user's profile
// @access Private
router.post('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.major = 'nil';
    profileFields.about_me = '';
    profileFields.interests = [];
    profileFields.skills = [];
    profileFields.specialization = 'nil';

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile) {
                //Create
                return new Profile(profileFields).save()
                        .then(profile => res.json(profile))
                        .catch(err => console.log(err));   
            }else{
                return res.json("Profile exists");
            }

        })
        .catch(err => console.log(err));
});

module.exports = router;