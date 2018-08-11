const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// store the requests of the user for the project of another user
const RequestSchema = new Schema ({
    user: { //the person who sends the request
        type: Schema.Types.ObjectId,  //associate users by id
        ref: 'users'
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    owner: { //owner id
        type: String,
    },
    project_title: {
        type: String,
    },
    project_id: {
        type: String,
    },
    message: {
        type: String,
    },
    role: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Request = mongoose.model('request', RequestSchema);