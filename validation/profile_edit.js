const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
    let errors = {};

    data.major = !isEmpty(data.major) ? data.major : '';
    data.specialization = !isEmpty(data.specialization) ? data.specialization : '';
    data.about_me = !isEmpty(data.about_me) ? data.about_me : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.interests = !isEmpty(data.interests) ? data.interests : '';


    if (Validator.isEmpty(data.major)) {
        errors.major = 'Major field is required';
    }

    if (Validator.isEmpty(data.specialization)) {
        errors.specialization = 'Specialization field is required';
    }

    if (Validator.isEmpty(data.about_me)) {
        errors.about_me = 'About Me field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if(Validator.isEmpty(data.interests)) {
        errors.interests = 'Interests field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};