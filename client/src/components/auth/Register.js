import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import Transition from '../layout/transition1.svg'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
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

  handleRegister(event) {
    event.preventDefault()

    const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const errors = this.state.errors
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginForm">
            <h3 className="loginTitle">Register</h3>
            <form noValidate className="loginFormHelp" onSubmit={this.handleRegister}>
              <input 
                value={this.state.name} 
                onChange={this.handleChange} 
                type="text"
                id="name"
                name="name" 
                placeholder="Username*" 
                className="submitUsername"
                required="" 
              />
              <br />
              <input 
                value={this.state.email} 
                onChange={this.handleChange} 
                type="text" 
                name="email" 
                placeholder="Email address*" 
                className="submitUsername"
                required="" 
              />
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
              <br />
              <input 
                value={this.state.password2} 
                onChange={this.handleChange} 
                type="password" 
                name="password2" 
                placeholder="Confirm password*" 
                className="submitUsername"
                required="" 
              />
              {errors.status && 
              <div className="errorWrapper">
                {errors.msg.name && <p className="errorText">{errors.msg.name}</p>}
                {errors.msg.email && <p className="errorText">{errors.msg.email}</p>}
                {errors.msg.password && <p className="errorText">{errors.msg.password}</p>}
                {errors.msg.password2 && <p className="errorText">{errors.msg.password2}</p>}
              </div>}
              <button 
                type="submit" 
                className="submitLoginButton"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="horizontalRuleSmall"></div>
        <p className="registerLinkText">Already have an account? <Link to="/login"> <b>Login</b></Link></p>
        <p className="registerLinkText">Back to <Link to="/"> <b>Home</b></Link></p>
        <br />
        <img src={Transition} alt="transition graphic" className="landingImage"></img>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register))
