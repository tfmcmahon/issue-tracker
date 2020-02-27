import { 
    CREATE_PROJECT, 
    GET_PROJECTS, 
    PROJECTS_LOADING, 
    DELETE_PROJECT,
    GET_SHARED_PROJECTS,
    SHARE_PROJECT,
    LEAVE_SHARED_PROJECT,
    CLEAR_SHARE,
    FADE_OFF_SHARE,
    FADE_ON_SHARE,
    CHECK_PROJECT_AUTH,
    CLEAR_PROJECT,
    GET_COLLABORATORS
} from '../actions/types'

const initialState = {
    projects: [],
    sharedProjects: [],
    loading: false,
    share: [],
    fade: false,
    collaborators: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            }
        case GET_SHARED_PROJECTS:
            return {
                ...state,
                sharedProjects: action.payload,
                loading: false
            }
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            }
        case PROJECTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload)
            }
        case SHARE_PROJECT:
            return {
                ...state,
                share: [action.payload]
            }
        case LEAVE_SHARED_PROJECT:
            return {
                ...state,
                sharedProjects: state.sharedProjects.filter(sharedProject => sharedProject._id !== action.payload)
            }
        case CLEAR_SHARE:
            return {
                ...state,
                share: []
            }
        case FADE_OFF_SHARE:
            return {
                ...state,
                fade: false
            }
        case FADE_ON_SHARE:
            return {
                ...state,
                fade: true
            }
        case CHECK_PROJECT_AUTH:
            return {
                ...state,
                collaborators: [action.payload, ...state.collaborators]
            }
        case CLEAR_PROJECT:
            return {
                ...state,
                collaborators: []
            }
        case GET_COLLABORATORS:
            return {
                ...state,
                collaborators: [action.payload]
            }
        default:
            return state
    }
}