const Validator = require("validator")
const isEmpty = require('is-empty')

module.exports = function validateShareInput(data) {
    let errors = {}

    // Convert empty fields to empty strings    
    data.collaborator = !isEmpty(data.collaborator) ? data.collaborator : ''

    //share checks
    if (Validator.isEmpty(data.collaborator)) {
        errors.collaborator = 'Username field is required'
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    }
}