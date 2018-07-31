const Validator = require('validator');
const rules = require('./rules');
const isEmpty = require('./is-empty');

module.exports = function registerInputValidation(data) {
    let errors = {};

    const nameRules = rules.name;
    const passwordRules = rules.password;

    if(!Validator.isLength(data.firstName, nameRules )) {
        errors.firstName = `First name must be beetween ${nameRules.min} and ${nameRules.max} characters`
    }

    if(!Validator.isAlpha(data.firstName)){
        errors.firstName = 'First name can\'t contains numbers';
    }

    if(!Validator.isLength(data.lastName, nameRules )) {
        errors.lastName = `Last name must be beetween ${nameRules.min} and ${nameRules.max} characters`
    }

    if(!Validator.isAlpha(data.lastName)){
        errors.lastName = 'Last name can\'t contains numbers';
    }

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required';
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }


    if(!Validator.isLength(data.password, passwordRules )) {
        errors.password = `Password must be beetween ${passwordRules.min} and ${passwordRules.max} characters`;
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.equals(data.password, data.confirmationPassword)) {
        errors.confirmationPassword = 'Passwords must match';
    }

    if(Validator.isEmpty(data.confirmationPassword)) {
        errors.confirmationPassword = 'Confirmation password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}