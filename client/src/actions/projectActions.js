import axios from 'axios';
import { VIEW_ALL_PROJECTS, PROJECT_LOADING, NEW_PROJECT, GET_ERRORS, VIEW_PROJECT, MY_DASHBOARD, EDIT_PROJECT, DELETE_PROJECT, ARCHIVE_PROJECT, APPLY_PROJECT, ACCEPT_REQUEST, RECENT_PROJECTS } from './types';

export const createNewproject = (projectData, history) => dispatch => {
    axios
        .post('/api/project/create', projectData)
        .then(res => {
            dispatch({
                type: NEW_PROJECT,
                payload: res.data

            });
            history.push('/search');
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setProjectLoading = () => {
    return {
        type: PROJECT_LOADING
    }
}

// search
export const searchProjects = (pageId, keywords) => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get(`/api/search/projects/query?page=${pageId}&search=${keywords}`)
        .then(res => {
            dispatch({
                type: VIEW_ALL_PROJECTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const viewSingleProject = (projectID) => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get(`/api/project/view/${projectID}`)
        .then(res => {
            dispatch({
                type: VIEW_PROJECT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const viewMyDashboard = (userID) => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get(`/api/project/user/${userID}`)
        .then(res => {
            dispatch({
                type: MY_DASHBOARD,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const editProject = (projectID, projectData, history) => dispatch => {
    axios
        .post(`/api/project/view/${projectID}`, projectData)
        .then(res => {
            dispatch({
                type: EDIT_PROJECT,
                payload: res.data
            });
            history.push(`/project_detail/${projectID}`);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const deleteProject = (projectID, history) => dispatch => {
    axios
        .delete(`/api/project/view/${projectID}`)
        .then(res => {
            dispatch({
                type: DELETE_PROJECT,
                payload: res.data
            });
            alert("Project deleted!");
            history.push('/projects');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const archiveProject = (projectID) => dispatch => {
    axios
        .post(`/api/project/archive/${projectID}`)
        .then(res => {
            dispatch({
                type: ARCHIVE_PROJECT,
                payload: res.data
            });
            window.location.reload();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const applyProject = (userMsg) => dispatch => {
    axios
        .post('/api/project/apply', userMsg)
        .then(res => {
            dispatch({
                type: APPLY_PROJECT,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const acceptRequest = (requestId, decision) => dispatch => {
    axios
        .post(`/api/project/accept/${requestId}`, decision)
        .then(res => {
            dispatch({
                type: ACCEPT_REQUEST,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const recentProjects = (userID) => dispatch => {
    axios
        .get(`/api/project/recent_posts/${userID}`)
        .then(res => {
            dispatch({
                type: RECENT_PROJECTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}