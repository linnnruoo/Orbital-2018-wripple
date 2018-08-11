import axios from 'axios';
import { GET_ERRORS, REVIEW_USER, GET_USER_RATING, GET_USER_REVIEWS } from './types';

// post individual reviews to db
export const sendReview = (review) => dispatch => {
    axios
        .post('/api/review/start', review)
        .then(res => {
            dispatch({
                type: REVIEW_USER,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};

// loas the reviews of this user
export const loadReview = (userID) => dispatch => {
    axios
        .get(`/api/review/view/${userID}`)
        .then(res => {
            dispatch({
                type: GET_USER_REVIEWS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};

// load the ratings of this user
export const loadRating = (userID) => dispatch => {
    axios
        .get(`/api/review/rating/${userID}`)
        .then(res => {
            dispatch({
                type: GET_USER_RATING,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};