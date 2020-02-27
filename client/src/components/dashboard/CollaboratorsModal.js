import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCollaborators, clearProject } from '../../actions/projectActions'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import peopleIcon from '../layout/people.svg'

class CollaboratorsModal extends Component {
    state = {
      modal: false
    }

    toggle = () => {
        if (this.state.modal === false) {
            this.props.getCollaborators(this.props.id)
        }
        setTimeout(() => this.setState({
          modal: !this.state.modal
        }), 250)
    }

    render() {
        let owner = this.props.projects.collaborators
        let collaborators = this.props.projects.collaborators
        let listItems = ""
        if (collaborators[0]) {
            owner = collaborators[0].user
            collaborators = collaborators[0].collaborators
            listItems = collaborators.map((collaborator) =>
                <p className="blueTextWrapper" key={collaborator}><b className="smallboldTextUpperBlue">{collaborator}</b></p>
            )
        }
        return (
            <div>
                <Button className="collaboratorsButton" onClick={this.toggle}>
                   <img className="collaboratorsSVG" src={peopleIcon} alt=""/>
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="loginTitle" toggle={this.toggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                    <div className="horizontalRule"></div>
                    <p className="modalText">Collaborators:</p>
                    <p className="modalText">
                        <b className="smallboldTextUpper">{owner}</b>
                        (owner)
                    </p>
                    {listItems.length > 0 
                    ? <div className="blueTextWrapper" >{listItems}</div>
                    : <p className="registerLinkText">No collaborators yet</p>
                    }

                    <div className="buttonRow">
                    <Button className="logoutButton" onClick={this.toggle}>Ok</Button>
                    </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

CollaboratorsModal.propTypes = {
    getCollaborators: PropTypes.func.isRequired,
    clearProject: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects
})

export default connect(
    mapStateToProps,
    { getCollaborators, clearProject }
)(CollaboratorsModal)