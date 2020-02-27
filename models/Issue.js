const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const IssueSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: String,
    status_text: String,
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    open: {
        type: String,
        default: 'true'
    }
})

const Issue = mongoose.model("issues", IssueSchema)
module.exports = Issue