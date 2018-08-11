const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// store the comments of a user to another user after completing the projects
const ReviewSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,  //associate users by id
        ref: 'users'
    },
    project_id: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    target_user: {
        type: String,
    },
    review: {
        type: String
    },
    rating: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);