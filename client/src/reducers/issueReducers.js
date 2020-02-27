import { 
    CREATE_ISSUE, 
    GET_ISSUES, 
    ISSUES_LOADING, 
    DELETE_ISSUE, 
    EDIT_ISSUE, 
    CLOSE_ISSUE, 
    GET_SINGLE_ISSUE,
    CLEAR_ISSUE,
    ISSUE_ERROR,
    DELETE_MANY_ISSUES,
    EDIT_ISSUE_CANCEL,
    CLEAR_ALL_ISSUES
} from '../actions/types'

const initialState = {
    issues: [],
    issue: [],
    isEdit: false,
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ISSUES:
            return {
                ...state,
                issues: action.payload,
                loading: false
            }
        case GET_SINGLE_ISSUE:
            return {
                ...state,
                issue: action.payload,
                isEdit: true
            }
        case CREATE_ISSUE:
            return {
                ...state,
                issues: [action.payload, ...state.issues]
            }
        case EDIT_ISSUE:
            return {
                ...state,
                isEdit: false
            }
        case EDIT_ISSUE_CANCEL:
            return {
                ...state,
                isEdit: false
            }
        case CLOSE_ISSUE:
            return {
                ...state,
                issue: action.payload
            }
        case ISSUES_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_ISSUE:
            return {
                ...state,
                issues: state.issues.filter(issue => issue._id !== action.payload)
            }
        case DELETE_MANY_ISSUES:
            return {
                ...state,
                issues: []
            }
        case CLEAR_ISSUE:
            return {
                ...state,
                issue: []
            }
        case CLEAR_ALL_ISSUES:
            return {
                ...state,
                issues: []
            }
        case ISSUE_ERROR:
            return {
                ...state,
                isEdit: true
            }
        default:
            return state
    }
}