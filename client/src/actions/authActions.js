import axios from 'axios';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a new user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/verifyemail'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
 
// Login - Get user token
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to local storage
            const { token } = res.data;
            // set token to local storage
            localStorage.setItem('jwtToken', token);
            // set token to Auth header
            setAuthToken(token);

            // decode token to get and store user data
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setCurrentUser(decoded));

            
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


// log out 
export const logoutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken');
    // remove auth header for future requests
    setAuthToken(false);
    //set current user to empty object
    //set isauthenticated to be false
    dispatch(setCurrentUser({}));
}