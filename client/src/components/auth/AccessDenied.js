import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Transition from '../layout/transition1.svg'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AccessDenied extends Component {
  constructor() {
    super()
    this.state = {
      auth: false
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
          <p className="lightText">You do not have permission to view that project</p>
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
      </div>
    )
  }
}

AccessDenied.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(AccessDenied)