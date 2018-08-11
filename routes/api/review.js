const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load fields
const Review = require('../../models/Review');
const Rating = require('../../models/Rating');
const Project = require('../../models/Project');

// @route Post api/review/start
// @desc post the individual reviews of a user
// @access Public
router.post('/start', passport.authenticate('jwt', { session: false }), (req, res) => {
    const num = req.body.target_users;
    
    // update isReviewed of the project
    const projectFields = {};
    projectFields.isReviewed = 1;

    Project.findById( req.body.project_id )
        .then(project => {
            if(project) {
                //update
                Project.findOneAndUpdate(
                    { _id: req.body.project_id }, 
                    { $set: projectFields }, 
                    { new: true }
                )
                .then(project => { console.log(project) });
            } else {
                return console.log("Project not found");
            }
        });     


    // save reviews
    for (var i=0; i<num.length; i++) {
        let curr_rate;
        let person = req.body.target_users[i].collaborator_id;
        let new_rate = req.body.ratings[i];

        const newReview = new Review({
            user: req.user.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            project_id: req.body.project_id, 
            target_user: person,
            review: req.body.reviews[i],
            rating: new_rate
        });

        newReview.save()
            .then(review => {
                Rating.findOne({ user: person })
                    .then(rating => {
                        console.log("found");
                        // update the rating of the user
                        if (new_rate === "good") {
                            curr_rate = rating.good; // temp array
                            curr_rate.push(1); // push to new array

                            Rating.findOneAndUpdate(
                                { _id: rating._id }, 
                                { $set: { good: curr_rate }}, 
                                { new: true }
                            ).then().catch(err => console.log(err));

                        } else if (new_rate === "average") {
                            curr_rate = rating.average;
                            curr_rate.push(1);

                            Rating.findOneAndUpdate(
                                { _id: rating._id }, 
                                { $set: { average: curr_rate }}, 
                                { new: true }
                            ).then().catch(err => console.log(err));
                            
                        } else {
                            curr_rate = rating.bad;
                            curr_rate.push(1);

                            Rating.findOneAndUpdate(
                                { _id: rating._id }, 
                                { $set: { bad: curr_rate }}, 
                                { new: true }
                            ).then().catch(err => console.log(err));
                            
                        }

                    })
                    .catch(err => {
                        console.log("user rating not found");
                        //create user rating in the Rating collection
                        if (new_rate === "good") {
                            newRate = new Rating({
                                user: person,
                                good: [1]
                            })    
                            newRate.save().then().catch(err => console.log(err));

                        } else if (new_rate === "average") {
                            newRate = new Rating({
                                user: person,
                                average: [1]
                            })   
                            newRate.save().then().catch(err => console.log(err));
                        } else {
                            newRate = new Rating({
                                user: person,
                                bad: [1]
                            })   
                            newRate.save().then().catch(err => console.log(err));
                        }

                       
                    })
            })
            .catch(err => console.log(err));
    }
})

// @route Get api/review/rating/:user_id
// @desc get the ratings of a user
// @access Public
router.get('/rating/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Rating.findOne({ user: req.params.user_id })
        .then(rating => res.json(rating))
        .catch(err => json.status(404).json("No ratings of this user"));
})

// @route Get api/review/view/:user_id
// @desc get the reviews of a user
// @access Public
router.get('/view/:user_id', (req, res) => {
    Review.find({target_user: req.params.user_id})
        .sort({date: -1})
        .limit(3)
        .then(reviews => { 
            res.json(reviews)
        })
        .catch(err => res.status(404).json("No reviews found for the user")) 
});
 
module.exports = router;