const Validator = require("validator")
const isEmpty = require('is-empty')

module.exports = function validateIssueInput(data) {
    let errors = {}

    // Convert empty fields to empty strings    
    data.issue_title = !isEmpty(data.issue_title) ? data.issue_title : ''
    data.issue_text = !isEmpty(data.issue_text) ? data.issue_text : ''
    data.created_by = !isEmpty(data.created_by) ? data.created_by : ''

    //title checks
    if (Validator.isEmpty(data.issue_title)) {
        errors.issue_title_submit = 'An issue title is required'
    } 

    if (Validator.isEmpty(data.issue_text)) {
        errors.issue_text_submit = 'Issue text is required'
    } 

    if (Validator.isEmpty(data.created_by)) {
        errors.created_by_submit = 'An issue creator is required'
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    }
}