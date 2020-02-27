import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Link, withRouter } from 'react-router-dom'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            projectTitle: ''
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(event) {
        event.preventDefault()
        this.props.logoutUser()
    }

    render() {
        return (
            <header className="App-header">
                <Link to="/" className="headerLink">
                    <div className="headerHelpType">
                        <p className="headerProjectTitle">Issue</p>
                        <p className="headerProjectTitle">Tracker</p>
                        <p className="headerProjectTitle">App</p>
                    </div>
                </Link>
                <div className="headerHelp">
                    {this.props.auth.isAuthenticated === true && 
                        <Link to="/dashboard"> 
                            <button
                                className="landingDashboardButton"
                            >
                                Dashboard
                            </button>
                        </Link>
                        }
                    <div className="verticalRuleSmallWhite"></div>
                    {this.props.auth.isAuthenticated === true && 
                    <button
                        onClick={this.handleLogout}
                        className="logoutButton"
                    >
                        Logout
                    </button>}
                    {this.props.auth.isAuthenticated === false && 
                    <Link to="/login"> 
                        <button
                            className="logoutButton"
                        >
                        Login
                        </button>
                </Link>}
                </div>
            </header> 
        )
    }
}

Nav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(Nav))