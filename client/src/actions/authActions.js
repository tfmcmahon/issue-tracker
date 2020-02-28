import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { returnErrors } from './errorActions'

import {
    SET_CURRENT_USER,
    USER_LOADING
} from './types'

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login')) //Re-direct to login on successful regist
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
        )
}

//Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            //Save to local storage
            
            //Set token to local storage
            const { token } = res.data
            localStorage.setItem('jwtToken', token)

            //Set token to Auth header
            setAuthToken(token)

            //Decode token to get user data
            const decoded = jwt_decode(token)

            //Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

//Set logged in useer
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem('jwtToken')

    //Remove auth header
    setAuthToken(false)
    
    //Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}