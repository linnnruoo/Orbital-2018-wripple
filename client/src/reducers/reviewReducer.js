import { GET_ERRORS, GET_USER_RATING, GET_USER_REVIEWS, REVIEW_USER } from '../actions/types';

const initialState = {
    reviews: null,
    ratings: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case REVIEW_USER:
            return {
                ...state
            }
        case GET_USER_RATING:
            return {
                ...state,
                ratings: action.payload
            }
        case GET_USER_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}