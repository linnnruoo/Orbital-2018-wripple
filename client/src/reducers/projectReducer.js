import { PROJECT_LOADING, NEW_PROJECT, VIEW_ALL_PROJECTS, GET_ERRORS, VIEW_PROJECT, MY_DASHBOARD, ACCEPT_REQUEST, RECENT_PROJECTS } from "../actions/types";

const initialState = {
    all_projects: [],
    projects_of_user: [],
    single_project: null,
    recent_project: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type) {
        case PROJECT_LOADING:
            return {
                ...state,
                loading: true
            }
        case NEW_PROJECT:
            return {
                ...state,
                loading: false
            }
        case VIEW_ALL_PROJECTS:
            return {
                ...state,
                all_projects: action.payload,
                loading: false
            }
        case VIEW_PROJECT:
            return {
                ...state,
                single_project: action.payload,
                loading: false
            }
        case MY_DASHBOARD:
            return {
                ...state,
                projects_of_user: action.payload,
                loading: false
            }
        case ACCEPT_REQUEST:
            return {
                ...state,
                loading: false
        }
        case RECENT_PROJECTS:
            return {
                ...state,
                recent_project: action.payload,
                loading: false
        }
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}