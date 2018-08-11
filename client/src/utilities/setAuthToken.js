import axios from 'axios';

// pass in the token and check for the token
const setAuthToken = token => {
    if(token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization']; //authorization in postman
    }
}

export default setAuthToken;