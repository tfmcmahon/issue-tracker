import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteIssue } from '../../actions/issueActions'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class DeleteIssueModal extends Component {
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
        const currentProject = window.location.pathname.replace(/\/dashboard\//, "")
        const currentProjectArr = currentProject.split("/")
        const issueData = {
            project: currentProjectArr[1],
            user: this.props.auth.user.name,
            id: this.props.id
        }
        setTimeout(() => this.props.deleteIssue(issueData), 500)
        
        // Close modal
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button className="deleteIssue" onClick={this.toggle}>Delete</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="loginTitle" toggle={this.toggle}>Delete Issue</ModalHeader>
                    <ModalBody>
                        <div className="horizontalRule"></div>
                        <p className="modalText">Are you sure you want to delete this issue?</p>
                        <p className="modalText">Its contents will be lost forever.</p>
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

DeleteIssueModal.propTypes = {
    deleteIssue: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { deleteIssue }
)(DeleteIssueModal)