import React, { Component } from 'react';
import '../css/dashboard.css';
import DashboardItems from './DashboardItems';

import { connect } from 'react-redux'; 
import { viewMyDashboard } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class MyDashboard extends Component {
    componentDidMount() {
        this.props.viewMyDashboard(this.props.auth.user.id);
    }
    
    render() {
        const { projects_of_user, loading } = this.props.project;

        if (projects_of_user === null || loading) {
            return <div className="dash-container"><div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div></div>
        } else { 
            return (
                <div className="container dash-container">
                <div className="row text-center">
                    <div className="col-md-3">
                        <div className="card px-2">
                            <div className="row py-3">
                                <div className="col">
                                    <i className="fa fa-exclamation-circle dash-icon text-danger"></i>
                                </div>
                                <div className="col">
                                    <h1 className="text-danger">{projects_of_user.total_requests ? projects_of_user.total_requests : 0}</h1>
                                </div>
                            </div>
                            <p className="m-b-0">Collaboration Requests</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card px-2">
                        <div className="row py-3">
                                <div className="col">
                                    <i className="fa fa-folder-open dash-icon text-success"></i>
                                </div>
                                <div className="col">
                                    <h1 className="text-success">{projects_of_user.ongoing_total ? projects_of_user.ongoing_total : 0}</h1>
                                </div>
                            </div>
                            <p className="m-b-0">Ongoing Projects</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                    <div className="card px-2">
                        <div className="row py-3">
                                <div className="col">
                                    <i className="fa fa-archive dash-icon text-info"></i>
                                </div>
                                <div className="col">
                                    <h1 className="text-info">{projects_of_user.archived_total ? projects_of_user.archived_total : 0}</h1>
                                </div>
                            </div>
                            <p className="m-b-0">Archived Projects</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card px-2">
                        <div className="row py-3">
                                <div className="col">
                                    <i className="fa fa-user-circle-o dash-icon text-warning"></i>
                                </div>
                                <div className="col">
                                    <h1 className="text-warning">{projects_of_user.total ? projects_of_user.total : 0}</h1>
                                </div>
                            </div>
                            <p className="m-b-0">My Projects</p>
                        </div>
                    </div>
                </div>
              
                <div className="card my-4">
                    <div className="card-header">New Collaboration Requests</div>
                    {projects_of_user.total_requests === 0 ? 
                        <div className="card-body text-muted">No Requests Received.</div> :
                        <div className="card-body"><DashboardItems projects={projects_of_user.requests} isRequest={1} isArchived={0} /></div>     
                    }
                </div>
    
                <div className="card my-4">
                    <div className="card-header">Ongoing Projects</div>
                    {projects_of_user.ongoing_total === 0 ? 
                        <div className="card-body text-muted">No Ongoing Projects.</div> :
                        <div className="card-body"><DashboardItems projects={projects_of_user.ongoing_projects} isRequest={0} isArchived={0} /></div>     
                    }
                </div>
                
                <div className="card my-4">
                    <div className="card-header">Archived Projects</div>
                    {projects_of_user.archived_total === 0 ? 
                        <div className="card-body text-muted">No Project Completed.</div> :
                        <div className="card-body"><DashboardItems projects={projects_of_user.archived_projects}  isRequest={0} isArchived={1} /></div>
                    }
                </div>

                <div className="card my-4">
                    <div className="card-header">My Projects</div>
                    {projects_of_user.total === 0 ? 
                        <div className="card-body text-muted">No Project Started.</div> :
                        <div className="card-body"><DashboardItems projects={projects_of_user.projects} isRequest={0} isArchived={0} /></div>
                    }
                </div>
               
                </div>
            );
        }
    }
}

MyDashboard.propTypes = {
    viewMyDashboard: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
    errors: state.errors
})

export default connect(mapStateToProps, { viewMyDashboard } )(MyDashboard);