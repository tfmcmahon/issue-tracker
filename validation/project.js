const Validator = require("validator")
const isEmpty = require('is-empty')

module.exports = function validateProjectInput(data) {
    let errors = {}

    // Convert empty fields to empty strings    
    data.title = !isEmpty(data.title) ? data.title : ''

    //title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Project title field is required'
    } 

    if (!Validator.isLength(data.title, { max: 15 })) {
        errors.length = 'Project title must be less than 16 characters'
    }

    if (!Validator.isAlphanumeric(data.title)) {
        errors.alphanumeric = 'Project title can only contain letters and numbers'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}