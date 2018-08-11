const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.university = !isEmpty(data.university) ? data.university : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First name field is required';
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last name field is required';
    }

    if (Validator.isEmpty(data.university)) {
        errors.university = 'University field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, {min: 8, max: 50 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (Validator.isEmpty(data.password2, {min: 8, max: 50 })) {
        errors.password2 = 'Confirm Password field is required';
    } 

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}