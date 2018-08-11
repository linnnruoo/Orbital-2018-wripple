const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.summary = !isEmpty(data.summary) ? data.summary : '';
    data.details = !isEmpty(data.details) ? data.details : '';
    data.looking_for = !isEmpty(data.looking_for) ? data.looking_for : '';
    data.team_size = !isEmpty(data.team_size) ? data.team_size : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (Validator.isEmpty(data.summary)) {
        errors.summary  = 'Summary field is required';
    }

    if (Validator.isEmpty(data.details)) {
        errors.details = 'Details field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}