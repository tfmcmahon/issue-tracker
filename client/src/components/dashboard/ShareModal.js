import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shareProject, clearShare, fadeOn, fadeOff } from '../../actions/projectActions'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { clearErrors } from '../../actions/errorActions'

class ShareModal extends Component {
    state = {
      modal: false,
      errors: {},
      share: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors }
        } else { 
            return null
        }
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal    
        })
        setTimeout(() => {
            this.setState({
                share: ''
            })
        }, 500)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (this.props.errors.status) {
            this.props.clearErrors()
        }
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const projectData = {
            collaborator: this.state.share,
            project: this.props.title,
            id: this.props.id,
            user: this.props.auth.user.name
        }

        this.props.shareProject(projectData)

        //if there are no errors ...
        setTimeout(() => {
            if (!this.props.errors.status) {
                //set a timer to set the fade state
                setTimeout(() => {
                    this.props.fadeOn()
                }, 3500)

                //... and set a slightly longer timer to clear the share success message and the fade state
                setTimeout(() => {
                    this.props.clearShare()
                    this.props.fadeOff()
                }, 4500)

                //... and close the modal if there are no errors
                this.toggle()
            }
        }, 500)
    }

    render() {
        const errors = this.state.errors
        return (
            <div>
                <Button className="shareButton" onClick={this.toggle}>Share</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="loginTitle" toggle={this.toggle}>Share Project</ModalHeader>
                    <ModalBody>
                        <div className="horizontalRule"></div>
                        <div className="shareWrapper">
                            <div className="shareProjectForm">
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                    value={this.state.share} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="share" 
                                        placeholder="Username*" 
                                        className="submitIssueTitle" 
                                    />
                                    {errors.status && 
                                    <div className="errorWrapperModal">
                                        {errors.msg.exist && <p className="errorText">{errors.msg.exist}</p>}
                                        {errors.msg.collaborator && <p className="errorText">{errors.msg.collaborator}</p>}
                                        {errors.msg.already && <p className="errorText">{errors.msg.already}</p>}
                                    </div>}
                                    <div className="buttonRow">
                                        <Button className="shareButtonModal" onClick={this.onSubmit}>Share</Button>
                                        <Button className="logoutButton" onClick={this.toggle}>Cancel</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ShareModal.propTypes = {
    shareProject: PropTypes.func.isRequired,
    clearShare: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { shareProject, clearErrors, clearShare, fadeOn, fadeOff }
)(ShareModal)