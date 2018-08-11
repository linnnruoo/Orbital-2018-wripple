import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import contactReducer from './contactReducer';
import projectReducer from './projectReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    contact: contactReducer,
    project: projectReducer,
    review: reviewReducer,
    errors: errorReducer
});