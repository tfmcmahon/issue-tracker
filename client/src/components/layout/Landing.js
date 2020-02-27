import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Transition from './transition1.svg'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Landing)