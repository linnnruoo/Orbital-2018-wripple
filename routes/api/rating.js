const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load fields
const Review = require('../../models/Review');

// @route Get api/review/
// @desc get the reviews of a particular user
// @access Public
router.get('/view/:user_id', (req, res) => {
   Review.find({target_user: req.params.user_id})
    .then(reviews => {
        res.json({
            reviews: reviews
        })
    })
    .then(err => res.status(404).json("No reviews found for the user")) 
});

// @
router.post('/start/:user1_id/for/:user2_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newReview = new Project({
        user: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name, 
        target_user: req.body.target_user,
        review: req.body.review,
        rating: req.body.rating
    });

    newReview.save()
        .then(review => res.json(review))
        .catch(err => console.log(err));
})
module.exports = router;