import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteProject } from '../../actions/projectActions'
import { deleteProjectIssues } from '../../actions/issueActions'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class DeleteProjectModal extends Component {
    state = {
      modal: false
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }
    
    onSubmit = event => {
        event.preventDefault()

        const userData = {
            user: this.props.auth.user.name,
            project: this.props.title
        }

        setTimeout(() => {
            this.props.deleteProject(this.props.id)
            this.props.deleteProjectIssues(userData)
        }, 500)
        

        // Close modal
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button className="deleteProjectButton" onClick={this.toggle}>X</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="loginTitle" toggle={this.toggle}>Delete Project</ModalHeader>
                    <ModalBody>
                    <div className="horizontalRule"></div>
                    <p className="modalText">Are you sure you want to delete this project?</p><p className="modalText"><b className="smallboldTextUpper">{this.props.title}</b> and all of its issues will be lost forever.</p>
                    <div className="buttonRow">
                    <Button className="deleteIssueModal" onClick={this.onSubmit}>Delete</Button>
                    <Button className="logoutButton" onClick={this.toggle}>Cancel</Button>
                    </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

DeleteProjectModal.propTypes = {
    deleteProject: PropTypes.func.isRequired,
    deleteProjectIssues: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { deleteProject, deleteProjectIssues }
)(DeleteProjectModal)