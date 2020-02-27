import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import Transition from '../layout/transition1.svg'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push('/dashboard') // push user to dashboard when they login
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors }
    } else {
      return null
    }
  }

  componentDidMount() {
    //If already logged in, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleLogin(event) {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
    // since we handle the redirect within our component, 
    //we don't need to pass in this.props.history as a parameter
  }

  render() {
    const errors = this.state.errors
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginForm">
              <h3 className="loginTitle">Login</h3>
              <form className="loginFormHelp" onSubmit={this.handleLogin}>
                  <input 
                    value={this.state.username} 
                    onChange={this.handleChange} 
                    type="text" 
                    name="email" 
                    placeholder="Email address*" 
                    className="submitUsername"
                    required="" 
                  />
                  <span className="redTextLoginEmail">
                    {errors.email}
                    {errors.emailnotfound}
                   </span>
                  <br />
                  <input 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    type="password" 
                    name="password" 
                    placeholder="Password*" 
                    className="submitUsername"
                    required="" 
                  />
                  <span className="redTextLoginPassword">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                  {errors.status && 
                    <div className="errorWrapper">
                        {errors.msg.email && <p className="errorText">{errors.msg.email}</p>}
                        {errors.msg.password && <p className="errorText">{errors.msg.password}</p>}
                        {errors.msg.passwordincorrect && <p className="errorText">{errors.msg.passwordincorrect}</p>}
                    </div>}
                  <button 
                    type="submit" 
                    className="submitLoginButton">
                      Login
                  </button>
              </form>
          </div>
        </div>
        <div className="horizontalRuleSmall"></div>
        <p className="registerLinkText">Don't have an account? <Link to="/register"> <b>Register</b></Link></p>
        <p className="registerLinkText">Back to <Link to="/"> <b>Home</b></Link></p>
        <br />
        <img src={Transition} alt="transition graphic" className="landingImage"></img>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login)
