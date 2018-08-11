const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,  //associate users by id
        ref: 'users'
    },
    first_name: {
        type: String
    }, 
    last_name: {
        type: String
    },
    university: {
        type: String
    },
    collaborators: [{
        collaborator_id: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        role: { type: String }
    }],
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    summary: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    looking_for: {
        type: [String],
        required: true
    },
    team_size: {
        type: String,
        required: true
    },
    commitment_lvl: {
        type: String,
        require: true
    },
    isArchived: {
        type: Number
    },
    isReviewed: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);