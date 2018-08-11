import axios from 'axios';
import { GET_ERRORS, SEND_FEEDBACK } from './types';

export const sendFeedback = (feedback) => dispatch => {
    axios
        .post('/api/contact/contact_us', feedback)
        .then(res => {
            dispatch({
                type: SEND_FEEDBACK,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};
