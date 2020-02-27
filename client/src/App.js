import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import 'bootstrap/dist/css/issuetrackercustom.css'

import Landing from './components/layout/Landing'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/project/Profile'
import AccessDenied from './components/auth/AccessDenied'
import NotFound from './components/layout/NotFound'

//Check for token
if (localStorage.jwtToken) {
  //Set auth token to header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  //Decode the token to get user info
  const decoded = jwt_decode(token)
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //Check for expired token
  const currentTime = Date.now() / 1000 //current date in milliseconds
  if (decoded.exp < currentTime) {
    //Logout user and redirect to login
    store.dispatch(logoutUser())
    window.location.href = './login'
  } 
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="wrapper">
            <Nav />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/access_denied' component={AccessDenied} />
                <PrivateRoute exact path ='/dashboard' component={Dashboard} />
                <PrivateRoute path="/dashboard/:user/:project" component={Profile} />
                <Route path="*" component={NotFound} />
              </Switch>
            <div className="blueFill"></div>
          </div>
          <Footer />
        </Router>
      </Provider>
    )
  }
}
export default App
