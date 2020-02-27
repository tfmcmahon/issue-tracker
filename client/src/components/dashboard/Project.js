import React, { Component } from "react"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DeleteProjectModal from './DeleteProjectModal'
import LeaveProjectModal from './LeaveProjectModal.js'
import ShareModal from './ShareModal'
import CollaboratorsModal from './CollaboratorsModal'

class Project extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render () {
        return (
            <div className="project">
                <Link to={{
                    pathname: `/dashboard/${this.props.item.user}/${this.props.item.title}`,
                    projectId: this.props.item._id
                }}>
                    <button className="projectButton">{this.props.item.title}</button>
                </Link>
                {this.props.isShared === false ? 
                    <div className="buttonHelp">
                        {this.props.projects.share[0] && this.props.item._id === this.props.projects.share[0].id && 
                        <div className={this.props.projects.fade === false ? "successHelp" : "successFade"}>
                            <div className="successWrapper">
                                <p className="successText">{this.props.projects.share[0].success}</p>
                            </div>
                        </div>}
                        {this.props.item.collaborators.length > 0 && <CollaboratorsModal id={this.props.item._id} title={this.props.item.title}/>}
                        {this.props.item.collaborators.length > 0 && <div className="verticalRuleSmall"></div>}
                        <ShareModal id={this.props.item._id} title={this.props.item.title}/>
                        <div className="verticalRuleSmall"></div>
                        <DeleteProjectModal id={this.props.item._id} title={this.props.item.title}/>
                    </div>
                :
                    <div className="buttonHelp">
                        <CollaboratorsModal id={this.props.item._id} title={this.props.item.title}/>
                        <div className="verticalRuleSmall"></div>
                        <LeaveProjectModal id={this.props.item._id} title={this.props.item.title}/>
                    </div>
                }
            </div>
        )
    }
}

Project.propTypes = {
    auth: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects
})

export default connect(
    mapStateToProps
)(Project)