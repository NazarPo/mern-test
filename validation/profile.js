const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfile(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.birth = !isEmpty(data.birth) ? data.birth : '';
    data.university = !isEmpty(data.university) ? data.university : '';
    data.faculty = !isEmpty(data.faculty) ? data.faculty : '';
    data.course = !isEmpty(data.course) ? data.course : '';
    data.socialNetwork = !isEmpty(data.socialNetwork) ? data.socialNetwork : ''

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 4 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.birth)) {
        errors.birth = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.university)) {
        errors.university = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.faculty)) {
        errors.faculty = 'Profile handle is required';
    }
    
    if (Validator.isEmpty(data.course)) {
        errors.course = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.socialNetwork)) {
        errors.socialNetwork = 'Profile handle is required';
    }
}