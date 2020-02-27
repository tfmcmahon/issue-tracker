import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import projectReducer from './projectReducers'
import issueReducer from './issueReducers'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    projects: projectReducer,
    issues: issueReducer
})