import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { closeIssue, editIssue, deleteIssue, getSingleIssue, clearIssue, editIssueCancel } from '../../actions/issueActions'
import { clearErrors } from '../../actions/errorActions'
import DeleteIssueModal from './DeleteIssueModal'

//Date translation function
const pad = (n) => {
    return n < 10 ? '0' + n : n
}

let currentProject,
    currentProjectArr

class SingleIssue extends Component {
    constructor() {
        super()
        this.state = {
            issue: {},
            errors: {},
            grayButton: '',
            issue_title: '',
            issue_text: '',
            created_by: '',
            assigned_to: '',
            status_text: '',
            created_on: '',
            updated_on: '',
            converted_created_on: '',
            converted_updated_on: ''
        }
        this.handleSubmitClose = this.handleSubmitClose.bind(this)
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
        this.handleSubmitStartEdit = this.handleSubmitStartEdit.bind(this)
        this.handleSubmitEndEdit = this.handleSubmitEndEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleGrayButton = this.handleGrayButton.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors }
        } else { 
            return null
        }
    }

    componentDidMount() {
        //Convert all date data when component mounts
        var currentDate = new Date(this.props.item.created_on),
            currentUpdateDate = new Date(this.props.item.updated_on)
        var date = currentDate.getDate(),
            updateDate = currentUpdateDate.getDate()
        var month = currentDate.getMonth(),
            updateMonth = currentUpdateDate.getMonth()
        var year = currentDate.getFullYear(),
            updateYear = currentUpdateDate.getFullYear()

        var mmddyyyy = pad(month + 1) + "/" + pad(date) + "/" + year + " at " + currentDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
            updatemmddyyyy = pad(updateMonth + 1) + "/" + pad(updateDate) + "/" + updateYear + " at " + currentUpdateDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
        this.setState({
            converted_created_on: mmddyyyy,
            converted_updated_on: updatemmddyyyy,
            issue_title: this.props.item.issue_title,
            issue_text: this.props.item.issue_text,
            created_by: this.props.item.created_by,
            assigned_to: this.props.item.assigned_to,
            status_text: this.props.item.status_text
        })
     }

    componentWillUnmount() {
        this.props.clearIssue()
        this.props.editIssueCancel()
    }

    handleChange(event) {
        const {name, value} = event.target
          this.setState({
            [name]: value
        })
    }

    handleSubmitStartEdit(event) {
        event.preventDefault()
        this.props.clearErrors()
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        //get a single issue when the edit button is pressed
        const singleIssueData = {
            title: currentProjectArr[1],
            user: currentProjectArr[0],
            id: event.target.id
        }
        this.props.getSingleIssue(singleIssueData) // getSingleIssue() sets global edit to true
    }

    handleSubmitEndEdit(event) {
        event.preventDefault()
        //push issue edits to DB
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        const issueData = {
                project: currentProjectArr[1],
                user: currentProjectArr[0],
                id: event.target.id,
                issue_title: this.state.issue_title,
                issue_text: this.state.issue_text,
                created_by: this.state.created_by,
                assigned_to: this.state.assigned_to,
                status_text: this.state.status_text,
                updated_on: new Date()
        }
        this.props.editIssue(issueData) // editIssue() sets global edit to false -- change so that it depends on server response

        //clear errors if the submission is validated -- this allows the user to exit the edit pane after an invalid submission.
        if (this.state.errors.status) {
            this.props.clearErrors()
        }
    }

    handleCancel(event) {
        event.preventDefault()
        this.props.editIssueCancel()
        this.props.clearIssue()
        this.setState({
            issue_title: this.props.item.issue_title,
            issue_text: this.props.item.issue_text,
            created_by: this.props.item.created_by,
            assigned_to: this.props.item.assigned_to,
            status_text: this.props.item.status_text
        })
        if (this.state.errors.status) {
            this.props.clearErrors()
        }
    }

    handleSubmitClose(event) {
        event.preventDefault()
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        const issueData = {
                project: currentProjectArr[1],
                user: currentProjectArr[0],
                id: event.target.id,
                open: this.props.item.open === 'true' ? 'false' : 'true'
        }
        this.props.closeIssue(issueData)
    }

    handleSubmitDelete(event) {
        event.preventDefault()
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        const issueData = {
                project: currentProjectArr[1],
                user: currentProjectArr[0],
                id: event.target.id
        }
        this.props.deleteIssue(issueData)
    }

    handleGrayButton(event) {
        event.preventDefault()
        this.setState({
            grayButton: event.target.value
        })
    }

    render() {
        const errors = this.state.errors
        const globalEdit = this.props.issues.isEdit
        var currentUpdateDate = new Date(this.props.item.updated_on)
            var updateDate = currentUpdateDate.getDate()
            var updateMonth = currentUpdateDate.getMonth()
            var updateYear = currentUpdateDate.getFullYear()
            var updatemmddyyyy = pad(updateMonth + 1) + "/" + pad(updateDate) + "/" + updateYear + " at " + currentUpdateDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })

        if (    //display edit pane if:
                globalEdit === false ||                                //global edit is false or ...
                this.props.item._id !== this.props.issues.issue._id    //the edited issue matches the component instance id

            ) {
            return ( // default pane
                    <div className={`issue${this.props.item.open}`}>
                        <p className="id"><b>({this.props.item.open === 'false' ? 'closed' : 'open'})</b> {`id: ${this.props.item._id}`}</p>
                        <div className="descriptionWrapper">
                            <div className="descriptionWrapperInner">
                                <p className="issueDescription">{this.props.item.issue_text}</p>
                            </div>
                        </div>
                        <p className="statusText"><b>Assigned to:</b> {this.props.item.assigned_to}</p>
                        <p className="statusText"><b>Status: </b>{this.props.item.status_text}</p>
                        {
                        //Button row
                        (globalEdit === false) ? 
                            <div className="buttonRow">
                                <form onSubmit={this.handleSubmitStartEdit} id={`${this.props.item._id}`}>
                                    <button className="editIssue" type="submit">Edit</button>
                                </form>
                                <form onSubmit={this.handleSubmitClose} id={`${this.props.item._id}`}>
                                    <button className="closeIssue" type="submit">
                                        {this.props.item.open === 'true' ? 'Close' : 'Reopen'}
                                    </button> 
                                </form>
                                <DeleteIssueModal id={this.props.item._id}/>
                            </div> 
                        :
                        //Grayed out buttons if an issue is being edited
                            <div className="buttonRow">
                                <form onSubmit={this.handleGrayButton} id={`${this.props.item._id}`}>
                                    <button className="grayButton" type="submit">Edit</button>
                                </form>
                                {this.props.item.open !== 'false' &&
                                    <form onSubmit={this.handleGrayButton} id={`${this.props.item._id}`}>
                                        <button className="grayButton" type="submit">Close</button> 
                                    </form>
                                }
                                <form onSubmit={this.handleGrayButton} id={`${this.props.item._id}`}>
                                    <button className="grayButton" type="submit">Delete</button>
                                </form>
                            </div> 
                        }
                        <div className="horizontalRule"></div>
                        <div className="infoText">
                            <p><b>Created by:</b> {this.props.item.created_by}</p> 
                            <p><b>Created on:</b> {this.state.converted_created_on}</p>  
                            <p><b>Last updated:</b> {updatemmddyyyy}</p>
                        </div>
                    </div>
            )
        } else {
            return ( // edit pane
                <div className="issueEditForm">
                    <h3 className="submitTitle">Edit issue</h3>
                    <form 
                        className="submitForm" 
                        onSubmit={this.handleSubmitEndEdit} 
                        id={`${this.props.item._id}`}
                    >
                        <input 
                            value={this.state.issue_title} 
                            onChange={this.handleChange} 
                            type="text" name="issue_title" 
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
                                type="text" name="assigned_to" 
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
                        <br />
                        {errors.status && 
                        <div className="errorWrapperModal">
                            {errors.msg.issue_title && <p className="errorText">{errors.msg.issue_title}</p>}
                            {errors.msg.issue_text && <p className="errorText">{errors.msg.issue_text}</p>}
                            {errors.msg.created_by && <p className="errorText">{errors.msg.created_by}</p>}
                        </div>}
                        <div className="buttonRow">
                            <button type="submit" className="editIssue">Accept</button>
                            <button onClick={this.handleCancel} className="editIssue">Cancel</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}


SingleIssue.propTypes = {
    closeIssue: PropTypes.func.isRequired,
    editIssue: PropTypes.func.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    getSingleIssue: PropTypes.func.isRequired,
    clearIssue: PropTypes.func.isRequired,
    editIssueCancel: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    issues: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    issues: state.issues,
    issue: state.issue,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { editIssue, closeIssue, deleteIssue, getSingleIssue, clearErrors, clearIssue, editIssueCancel }
)(SingleIssue)