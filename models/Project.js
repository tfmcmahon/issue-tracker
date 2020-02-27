const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    },
    collaborators: {
        type: [String]
    }
})

const Project = mongoose.model("projects", ProjectSchema)
module.exports = Project 