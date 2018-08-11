const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema ({
    user: {
        type: String
    },
    good: {
        type: [String]
    },
    average: {
        type: [String]
    },
    bad: {
        type: [String]
    },
});

module.exports = Rating = mongoose.model('rating', RatingSchema);