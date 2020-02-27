import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { leaveProject } from '../../actions/projectActions'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class LeaveProjectModal extends Component {
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

        const projectData = {
            collaborator: this.props.auth.user.name,
            project: this.props.title,
            id: this.props.id
        }

        setTimeout(() => {
            this.props.leaveProject(projectData)
        }, 500)
        

        // Close modal
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button className="deleteProjectButton" onClick={this.toggle}>X</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="loginTitle" toggle={this.toggle}>Leave Project</ModalHeader>
                    <ModalBody>
                    <div className="horizontalRule"></div>
                    <p className="modalText">Are you sure you want to leave this project?</p>
                    <p className="modalText">You will no longer be able to collaborate on <b className="smallboldTextUpper">{this.props.title}</b></p>
                    <div className="buttonRow">
                    <Button className="deleteIssueModal" onClick={this.onSubmit}>Leave</Button>
                    <Button className="logoutButton" onClick={this.toggle}>Cancel</Button>
                    </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

LeaveProjectModal.propTypes = {
    leaveProject: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { leaveProject }
)(LeaveProjectModal)