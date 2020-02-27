import axios from 'axios'
import { returnErrors, clearErrors } from './errorActions'
import { 
  CREATE_ISSUE, 
  GET_ISSUES, 
  ISSUES_LOADING, 
  DELETE_ISSUE, 
  CLOSE_ISSUE, 
  EDIT_ISSUE, 
  GET_SINGLE_ISSUE,
  CLEAR_ISSUE,
  ISSUE_ERROR,
  DELETE_MANY_ISSUES,
  EDIT_ISSUE_CANCEL,
  CLEAR_ALL_ISSUES
} from './types'

//Create issue
export const createIssue = newIssue => dispatch => {
  axios
    .post(`/api/issues/${newIssue.user}/${newIssue.project}/${newIssue.issue_title}`, newIssue)
    .then(res => {
      dispatch({
        type: CREATE_ISSUE,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Get issues
export const getIssues = projectData => dispatch => {
  dispatch(setIssuesLoading())
  axios
    .get(`/api/issues/${projectData.user}/${projectData.project}`)
    .then(res => 
      dispatch({
        type: GET_ISSUES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Issues loading
export const setIssuesLoading = () => {
  return {
    type: ISSUES_LOADING
  }
}

//Delete issue
export const deleteIssue = issueData => (dispatch, getState) => {
  axios
    .delete(`/api/issues/${issueData.user}/${issueData.project}/${issueData.id}`)
    .then(res => 
      dispatch({
        type: DELETE_ISSUE,
        payload: issueData.id
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Edit issue
export const editIssue = issueData => (dispatch, getState) => {
  axios
    .put(`/api/issues/${issueData.user}/${issueData.project}/${issueData.id}`, issueData)
    .then(res => {
      dispatch({
        type: EDIT_ISSUE,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ISSUE
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: ISSUE_ERROR
      })
    })
}

//Close issue
export const closeIssue = issueData => (dispatch, getState) => {
  axios
    .put(`/api/issues/${issueData.user}/${issueData.project}/${issueData.id}/close`, issueData)
    .then(res => 
      dispatch({
        type: CLOSE_ISSUE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Get single issue
export const getSingleIssue = singleIssueData => dispatch => {
  axios
    .get(`/api/issues/${singleIssueData.user}/${singleIssueData.project}/${singleIssueData.id}`)
    .then(res => 
      dispatch({
        type: GET_SINGLE_ISSUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

// Clear issue
export const clearIssue = () => {
  return {
    type: CLEAR_ISSUE
  }
}

// Clear all issues
export const clearAllIssues = () => {
  return {
    type: CLEAR_ALL_ISSUES
  }
}

//Delete all issues from a project (delete project)
export const deleteProjectIssues = userData => dispatch => {
  axios
    .delete(`api/issues/${userData.user}/${userData.project}`)
    .then(res => 
      dispatch({
        type: DELETE_MANY_ISSUES,
        payload: userData.project
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

// Clear issue
export const editIssueCancel = () => {
  return {
    type: EDIT_ISSUE_CANCEL
  }
}