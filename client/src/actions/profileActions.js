import axios from 'axios';

import { VIEW_PROFILE, GET_ERRORS, MY_PROFILE, CLEAR_CURRENT_PROFILE, PROFILE_LOADING, EDIT_PROFILE, CREATE_PROFILE } from './types';

export const getMyProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/user/current')
        .then(res => {
            dispatch({
                type: MY_PROFILE,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};

// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const editMyProfile = (profileData) => dispatch => {
    axios
        .post('/api/profile/user/current', profileData)
        .then(res => {
                dispatch({
                type: EDIT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }))
}

export const createProfile = () => dispatch => {
    axios
        .post('/api/profile/user')
        .then(res => {
            dispatch({
                type: CREATE_PROFILE
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
}

export const viewProfile = (userId) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/user/${userId}`)
        .then(res => {
            dispatch({
                type: VIEW_PROFILE,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
}