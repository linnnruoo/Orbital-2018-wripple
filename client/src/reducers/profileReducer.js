import { VIEW_PROFILE, MY_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, EDIT_PROFILE, CREATE_PROFILE } from "../actions/types";

const initialState = {
    profiles: null,
    profile: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case MY_PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case EDIT_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CREATE_PROFILE:
            return {
                ...state,
                loading: false
            }
        case VIEW_PROFILE:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        default:
            return state;
    }
}