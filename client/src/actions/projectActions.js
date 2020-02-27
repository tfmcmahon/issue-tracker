import axios from 'axios'
import { returnErrors } from './errorActions'
import { 
  CREATE_PROJECT, 
  GET_PROJECTS, 
  PROJECTS_LOADING, 
  DELETE_PROJECT, 
  SHARE_PROJECT, 
  GET_SHARED_PROJECTS,
  LEAVE_SHARED_PROJECT, 
  CLEAR_SHARE,
  FADE_ON_SHARE,
  FADE_OFF_SHARE,
  CHECK_PROJECT_AUTH,
  CLEAR_PROJECT,
  GET_COLLABORATORS
} from './types'

//Create project
export const createProject = newProject => dispatch => {
  axios
    .post(`/api/dashboard/${newProject.user}`, newProject)
    .then(res =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Get projects
export const getProjects = userData => dispatch => {
  dispatch(setProjectsLoading())
  axios
    .get(`/api/dashboard/${userData.user}`)
    .then(res => 
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  }
}

export const deleteProject = id => (dispatch, getState) => {
  axios
    .delete(`/api/dashboard/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}


//Share project
export const shareProject = projectData => (dispatch, getState) => {
  axios
    .put(`/api/dashboard/${projectData.project}/${projectData.collaborator}/${projectData.id}`, projectData)
    .then(res => {
      dispatch({
        type: SHARE_PROJECT,
        payload: res.data
      })
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Get shared projects
export const getSharedProjects = userData => dispatch => {
  //dispatch(setProjectsLoading())
  axios
    .get(`/api/dashboard/shared/${userData.user}`)
    .then(res => 
      dispatch({
        type: GET_SHARED_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Leave project
export const leaveProject = projectData => (dispatch, getState) => {
  axios
    .put(`/api/dashboard/leave/${projectData.project}/${projectData.collaborator}/${projectData.id}`, projectData)
    .then(res => {
      dispatch({
        type: LEAVE_SHARED_PROJECT,
        payload: projectData.id
      })
    })
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Clear shared
export const clearShare = () => {
  return {
    type: CLEAR_SHARE
  }
}

//Fade off
export const fadeOff = () => {
  return {
    type: FADE_OFF_SHARE
  }
}

//Fade on
export const fadeOn = () => {
  return {
    type: FADE_ON_SHARE
  }
}

//Check project permissions
export const checkProjectAuth = userData => (dispatch, getState) => {
  axios
    .get(`/api/dashboard/permission/${userData.user}/${userData.project}`, userData)
    .then(res => 
      dispatch({
        type: CHECK_PROJECT_AUTH,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//Clear project
export const clearProject = () => {
  return {
    type: CLEAR_PROJECT
  }
}

//Get projects
export const getCollaborators = project => dispatch => {
  dispatch(setProjectsLoading())
  axios
    .get(`/api/dashboard/collaborators/${project}`)
    .then(res => 
      dispatch({
        type: GET_COLLABORATORS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}