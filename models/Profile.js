const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,  //associate users by id
        ref: 'users'
    },
    major: {
        type: String,
        //required: true
    },
    specialization: {
        type: String,
    },
    about_me: {
        type: String,
        //required: true
    },
    skills: {
        type: [String],
        //required: true
    },
    interests: {
        type: [String],
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);