import { GET_ERRORS, SEND_FEEDBACK } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    //test 
    switch(action.type) {
        case SEND_FEEDBACK:
            return action.payload;
        
        case GET_ERRORS:
            return action.payload;

        default:
            return state;
    }
}