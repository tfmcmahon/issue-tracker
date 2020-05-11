import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Transition from './transition1.svg'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactFreezeframe from 'react-freezeframe'
import closeDelete from '../../images/CloseDelete.gif'
import createEdit from '../../images/CreateEdit.gif'
import projectShare from '../../images/ProjectShare.gif'
import registerLogin from '../../images/RegisterLogin.gif'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      auth: false
    }
  }
  
  componentDidUpdate() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push('/dashboard') // push user to dashboard when they login
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth !== prevState.auth) {
      return { auth: nextProps.auth }
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div className="landing">
          <p className="lightText"><b className="boldText">Issue Tracker App: </b> A full stack web application</p>
          <p className="subText">Created using React, Mongoose, Node, and Express</p>
          <p className="subText">
            <a
              href='https://github.com/tfmcmahon/issue-tracker'
              rel="noopener noreferrer"
              target='_blank'
            >
              <b className="smallboldTextUpperBlue"> See the source code on Github</b>
            </a>
          </p>
          {this.state.auth.isAuthenticated !== true ?
            <div className="landingButtonsWrapper">
              <Link to='/login'>
                <button className='loginLandingButton'>
                  Login
                </button>
              </Link> 
              <div className="verticalRuleSmall"></div>
              <Link to='/register'>
                <button className='registerButton'>
                  Register
                </button>
              </Link>
            </div>
          :
          <div className="landingButtonsWrapper">
            <Link to='/dashboard'>
              <button className='landingDashboardButton'>
                dashboard
              </button>
            </Link>
          </div>
        }
        </div>
        <img src={Transition} alt="transition graphic" className="landingImage"></img>
        <div className="walkThroughIntro">  
          <p>
              Check out the app features below. Hover over the images to see them in action:
          </p>
          <div className="horizontalRuleLanding"></div>
        </div>
        <div className="walkthroughWrapper">
          <div className="walkthroughItem">
            <h3 className="walkThroughName">Users</h3>
            <div className="gif">
              <ReactFreezeframe src={registerLogin} />
            </div>
            <p className="walkThroughText">
              Users can create an account with a username, email, and password. 
              The app uses JSON Web tokens for authentication.
            </p>
          </div>

          <div className="walkthroughItem">
            <h3 className="walkThroughName">Projects</h3>
            <div className="gif">
              <ReactFreezeframe src={projectShare} />
            </div>
            <p className="walkThroughText">
              Create projects, which act as containers for issues.
              Projects can be shared with other users. 
              Projects that have been shared can have issues added and edited by collaborating users.
            </p>
          </div>

          <div className="walkthroughItem">
            <h3 className="walkThroughName">Issues</h3>
            <div className="gif">
              <ReactFreezeframe src={createEdit} />
            </div>
            <p className="walkThroughText">
              Create issues within a project.
              Issues can have any of their fields updated at any time.
            </p>
          </div>

          <div className="walkthroughItem">
            <h3 className="walkThroughName">Close and delete</h3>
            <div className="gif">
              <ReactFreezeframe src={closeDelete} />
            </div>
            <p className="walkThroughText">
              Issues and projects can also be closed and/or deleted.
              Closed issues can be reopened. Deleted issues and projects can't be seen by collaborating users and cannot be restored.
            </p>
          </div>

        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Landing)