import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProject, getProjects, getSharedProjects } from '../../actions/projectActions'
import { clearErrors } from '../../actions/errorActions'
import Transition from '../layout/transition1.svg'
import Project from './Project'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            projectTitle: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateProject = this.handleCreateProject.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
          return { errors: nextProps.errors }
        } else {
          return null
        }
    }

    componentDidMount() {
        const userData = {
          user: this.props.auth.user.name
        }
        this.props.getProjects(userData)
        this.props.getSharedProjects(userData)
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })
    }

    handleCreateProject(event) {
        event.preventDefault()
        const newProject = {
          title: this.state.projectTitle,
          user: this.props.auth.user.name
        }
        this.props.createProject(newProject)
        setTimeout(() => {
            this.setState({
                projectTitle: ''
            })
        }, 500)
    }

    render() {
        const errors = this.state.errors
        const { user } = this.props.auth
        const { projects } = this.props.projects
        const { sharedProjects } = this.props.projects
        const projectList = projects.map((project) => 
            <Project item={project} key={project._id} isShared={false} />
        )
        const sharedList = sharedProjects.map((sharedProject) => 
            <Project item={sharedProject} key={sharedProject._id} isShared={true} />
        )
        return (
            <div>
                <div className="dashboard">
                    <p className="lightText">Hey there, <b className="boldText">{user.name.split(" ")[0]}</b> You are logged in!</p>
                    <p className="subText"> This is a full-stack Issue Tracker app</p>
                    <div className="createProject">
                        <div className="loginWrapper">
                            <div className="newProjectForm">
                                <h3 className="loginTitle">Create a new project</h3>
                                <form className="loginFormHelp" onSubmit={this.handleCreateProject}>
                                    <input 
                                        value={this.state.projectTitle} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="projectTitle" 
                                        placeholder="Project title*" 
                                        className="submitUsername"
                                        required="" 
                                    />
                                    {(errors.msg.title || errors.msg.alphanumeric || errors.msg.length) && 
                                    <div className="errorWrapper">
                                        {errors.msg.title && <p className="errorText">{errors.msg.title}</p>}
                                        {errors.msg.alphanumeric && <p className="errorText">{errors.msg.alphanumeric}</p>}
                                        {errors.msg.length && <p className="errorText">{errors.msg.length}</p>}
                                    </div>}
                                    <br />
                                    <button 
                                        type="submit" 
                                        className="submitProjectButton">
                                        Create Project
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={Transition} alt="transition graphic" className="landingImage"></img>
                {projectList.length > 0 ? 
                    <div className="projects">
                        <h3 className="loginTitle">My projects:</h3>
                        {projectList}
                    </div> :
                    <div className="blueFill">
                        <p className="explainerText">Use the form above to create your first project!</p>
                    </div>
                }
                <div className="horizontalRuleDashboard"></div>
                {sharedList.length > 0 ?
                    <div className="sharedProjects">
                        <h3 className="sharedTitle">Shared with me:</h3>
                        {sharedList}
                    </div> :
                    <div className="blueFill">
                        <p className="explainerText">You don't have any projects shared with you. Ask your friends to join in on their projects!</p>
                    </div>
                }
                <div className="blueFill"></div>
                
            </div>
        )
    }
}

Dashboard.propTypes = {
    getProjects: PropTypes.func.isRequired,
    getSharedProjects: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createProject, getProjects, clearErrors, getSharedProjects }
)(Dashboard)