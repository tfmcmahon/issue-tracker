import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Issues from "./Issues" 
import Submit from "./Submit" 
import Transition from '../layout/transition1.svg'
import { checkProjectAuth, clearProject } from '../../actions/projectActions'
import { clearErrors } from '../../actions/errorActions'
import CollaboratorsModal from '../dashboard/CollaboratorsModal'

let currentProject = '',
    currentProjectArr = ''

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            owner: '',
            errors: {},
            id: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.issues !== prevState.issues || nextProps.errors !== prevState.errors) {
            if (nextProps.errors.status) { // send user to acces denied if not a collaborator
                if (nextProps.errors.status === 401) {
                    nextProps.history.push('/access_denied')
                }
            }
            currentProject = window.location.pathname.replace(/\/dashboard\//, "")
            currentProjectArr = currentProject.split("/")
            return { 
                owner: currentProjectArr[0],
                errors: nextProps.errors,
                id: nextProps.projects.collaborators[0]
            }
        } else {
            return null
        }
    }

    componentDidMount() {
        currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        currentProjectArr = currentProject.split("/")
        const userData = {
            user: this.props.auth.user.name,
            project: currentProjectArr[1]
        }
        this.props.checkProjectAuth(userData)
    }

    componentWillUnmount() {
        this.props.clearProject()
        this.props.clearErrors()
    }

    render() {
        let projectId = "",
            collaborators = []
        if (this.props.projects.collaborators[0]) {
            projectId = this.props.projects.collaborators[0]._id
            collaborators = this.props.projects.collaborators[0].collaborators
        }
        return (
            <div className="App">
                <div>
                    <div className="projectOwner">
                        <p className="lightText">Viewing all issues for <b className="boldText">{currentProjectArr[1]}</b></p>
                        <div className="buttonMarginHelp">
                            {collaborators.length > 0 
                            ? <CollaboratorsModal id={projectId} title={currentProjectArr[1]}/>
                        : null}
                        </div>
                    </div>
                    <Submit />
                    <img src={Transition} alt="transition graphic" className="transitionImage"></img>
                    <Issues />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    issues: state.issues,
    auth: state.auth,
    projects: state.projects,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { checkProjectAuth, clearProject, clearErrors }
)(withRouter(Profile))