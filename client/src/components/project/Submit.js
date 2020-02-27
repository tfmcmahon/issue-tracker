import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createIssue } from '../../actions/issueActions'
import { clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'

class Submit extends Component {
    constructor() {
        super()
        this.state = {
            issue_title: '',
            issue_text: '',
            created_by: '',
            assigned_to: '',
            status_text: '',
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors }
        } else {
            return null
        }
    }
    
    componentWillUnmount() {
        this.props.clearErrors()
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        var currentProject = window.location.pathname.replace(/\/dashboard\//, ""),
            currentProjectArr = currentProject.split("/")
        var newIssue = {
                user: currentProjectArr[0],
                project: currentProjectArr[1],
                issue_title: this.state.issue_title,
                issue_text: this.state.issue_text,
                created_by: this.state.created_by,
                assigned_to: this.state.assigned_to,
                status_text: this.state.status_text,
                created_on: new Date()
        }
        this.props.createIssue(newIssue)
        //clear the state after submitting an issue
        this.setState({
            issue_title: '',
            issue_text: '',
            created_by: '',
            assigned_to: '',
            status_text: ''
        })
    }

    render () {
        const errors = this.state.errors
        return (
            <div className="submitWrapper">
                <div className="submitIssueForm">
                    <h3 className="submitTitle">Create a new issue</h3>
                    <form className="submitForm" onSubmit={this.handleSubmit}>
                        <input 
                            value={this.state.issue_title} 
                            onChange={this.handleChange} 
                            type="text" 
                            name="issue_title" 
                            placeholder="Title*" 
                            className="submitIssueTitle" 
                            required=""
                         />
                        <textarea 
                            value={this.state.issue_text} 
                            onChange={this.handleChange} 
                            type="text" 
                            name="issue_text" 
                            placeholder="Issue description*" 
                            className="submitIssueText" 
                            required="" 
                        />
                        <div className="smallInputs">
                            <input 
                                value={this.state.created_by} 
                                onChange={this.handleChange} 
                                type="text" 
                                name="created_by" 
                                placeholder="Created by*" 
                                className="submitIssueSmall" 
                                required=""
                            >
                            </input>
                            <input 
                                value={this.state.assigned_to} 
                                onChange={this.handleChange} 
                                type="text" 
                                name="assigned_to" 
                                placeholder="Assigned to" 
                                className="submitIssueSmall"
                            >
                            </input>
                            <input 
                                value={this.state.status_text} 
                                onChange={this.handleChange} 
                                type="text" 
                                name="status_text" 
                                placeholder="Status text" 
                                className="submitIssueSmall"
                            >
                            </input>
                        </div>
                        {(errors.msg.issue_title_submit || errors.msg.issue_text_submit || errors.msg.created_by_submit) && 
                        <div className="errorWrapper">
                            {errors.msg.issue_title_submit && <p className="errorText">{errors.msg.issue_title_submit}</p>}
                            {errors.msg.issue_text_submit && <p className="errorText">{errors.msg.issue_text_submit}</p>}
                            {errors.msg.created_by_submit && <p className="errorText">{errors.msg.created_by_submit}</p>}
                        </div>}
                        <button type="submit" className="submitIssueButton">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

Submit.propTypes = {
    auth: PropTypes.object.isRequired,
    createIssue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    issues: state.isues,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createIssue, clearErrors }
)(Submit)
