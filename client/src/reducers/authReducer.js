import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is_empty';


const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    //test // set the current user
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        default:
            return state;
    }
}