import React, { Component } from 'react'
import '../css/project.css';
import avatar from '../img/avatar.jpg';
import '../css/loading.css';

import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewSingleProject, archiveProject, deleteProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import ProjectApply from './ProjectApply'
import RecentProjects from './RecentProjects';
import Rating from './Rating';


class ProjectDetail extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }

    this.onArchiveClick = this.onArchiveClick.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.checkCollab = this.checkCollab.bind(this);
  }

  // mount the project details
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.viewSingleProject(this.props.match.params.projectId);
    } else {
      this.props.history.push('/login');
    }
  }
  
  onArchiveClick = e => {
    // mark this project as archive
    e.preventDefault();
    this.props.archiveProject(this.props.match.params.projectId);
  }

  onApplyClick = () => {
    //open up a modal / redirect to a page that allows the user to send a message
    if (this.props.auth.isAuthenticated) {
      this.setState({ showModal: true })
    } else {
      this.props.history.push('/login')
    }
  }

  onDeleteClick = e => {
    //delete the project post
    e.preventDefault();
    this.props.deleteProject(this.props.match.params.projectId, this.props.history);
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  checkCollab(collaborators, user_id) {
    var found = false;

    for (var i=0; i<collaborators.length; i++){
      if (collaborators[i]['collaborator_id'] === user_id) {
        found = true;
      }
    }

    return found;
  }


  render() {
    const { single_project, loading } = this.props.project;
    const { user } = this.props.auth;

    // aim: Checking if the project is posted by the current logged in user
    // desc: 'completed' shows that this project is completed
    // desc: 'visitor' displays the apply button
    // desc: 'host' displays the control panel of the projects
    // desc: 'collaborator' displays 'You are in' button
    const completed = (
      <button className="btn btn-warning btn-block text-left" alt="Project is archived"><i className="fas fa-archive mr-4"></i>Completed!</button>
    )

    const visitor = (
      <button className="btn btn-success btn-block text-left" onClick={this.onApplyClick}><i className="fas fa-check mr-4"></i>Apply now!</button>
    )

    const owner = (
      <div>
        <button className="btn btn-success btn-block text-left mb-2" onClick={this.onArchiveClick}><i className="fas fa-check mr-4"></i>Mark as completed</button>
        <NavLink to={`/edit_project/${this.props.match.params.projectId}`}><button className="btn btn-info btn-block text-left"><i className="fas fa-edit mr-4"></i>Edit project</button></NavLink>
        <button className="btn btn-danger btn-block text-left mt-2" onClick={this.onDeleteClick}><i className="fas fa-trash mr-4"></i>Delete project</button>
      </div>
    )

    const collaborator = (
      <button className="btn btn-success btn-block text-left"><i className="fas fa-check mr-4"></i>You are in!</button>
    )

    // reformatting the date of the project posted
    const timestampOptions = {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    if (single_project === null || loading) {
      return <div className="project-container"><div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div></div>
    } else {
      return (
        <div className="container project-container">
          <div className="row">
            <div className="col-9">
              <div className="card shadow-sm mb-2">
                <div className="card-body">
                  <h3 className="card-title text-blue">{single_project.title}</h3>
                  <h5 className="card-subtitle text-muted mb-4">{single_project.subtitle}</h5>

                  <p>{single_project.details}</p>
                  <hr />

                  <div className="row">
                    <div className="col-3"><span className="btm-headings">LOOKING FOR: </span></div>
                    <div className="col-9">{single_project.looking_for.map((job, index) => {
                      return <div className="btn btn-light btn-sm shadow-sm m-2" key={index}>{ job==="Graphic_Designer" ? <div>Graphic Designer</div> : job }</div>
                    })}</div>
                  </div>

                  <div className="row">
                    <div className="col-3"><span className="btm-headings">COMMITMENT LEVEL: </span></div>
                    <div className="col-9"><div className="btn btn-light btn-sm shadow-sm m-2">{single_project.commitment_lvl}</div></div>
                  </div>

                  <div className="row">
                    <div className="col-3"><span className="btm-headings">TEAM SIZE: </span></div>
                    <div className="col-9"><div className="btn btn-light btn-sm shadow-sm m-2">{single_project.team_size}</div></div>
                  </div>

                  <div className="row">
                    <div className="col-3"><span className="btm-headings">POSTED ON: </span></div>
                    <div className="col-9"><span className="m-2">{new Date(single_project.date).toLocaleString('en-SG', timestampOptions)}</span></div>
                  </div>

                </div>


              </div>

              <div className="card shadow-sm mb-2">
                <div className="card-body">
                  <h5>Collaborators:</h5>
                  <div className="row">
                    {single_project.collaborators.length > 0 ?
                      (
                        single_project.collaborators.map((person, index) => {
                          return <div className="col-2 text-center" key={index}>
                            <img src={avatar} alt="" className="detail-avatar-mini mt-2" />
                            <NavLink to={`/profiles/${person.collaborator_id}`} className="text-blue">
                              <p>{person.first_name} {person.last_name}</p>
                            </NavLink>
                          </div>
                        })
                      ) : (
                        <div className="ml-3 text-center">
                          <h6 className="text-muted">No collaborators currently.</h6>
                        </div>
                      )
                    }


                  </div>
                </div>
              </div>


              {/*Get recent projects of the host*/}
              <div className="card shadow-sm mb-2">
                <RecentProjects userId = {single_project.user} />
              </div>
            
            </div>

            <div className="col-3">

              <div className="card shadow-sm mb-2">
                <div className="card-body">
                  
                  {single_project.isArchived ? completed : (user.id === single_project.user ? owner : (this.checkCollab(single_project.collaborators, user.id) ? collaborator : visitor))}
                  
                </div>
              </div>

              <div className="card shadow-sm mb-2">
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title text-blue">Posted by:</h5>
                    <img src={avatar} alt="" className="detail-avatar mt-2" />
                    <NavLink to={`/profiles/${single_project.user}`} className="text-blue">
                      <button type="button" className="btn btn-light btn-sm shadow-sm m-2">
                        <h5 className="mt-2 text-blue">{single_project.first_name} {single_project.last_name}</h5>
                        <div>{single_project.university}</div>
                      </button>
                    </NavLink>
                    <Rating userId = {single_project.user} />
                  </div>
                </div>
              </div>


            </div>
          </div>
          <ProjectApply showModal={this.state.showModal} closeModal={this.closeModal} projectDetails={single_project}></ProjectApply>
        </div >
      )
    }
  }
}

ProjectDetail.propTypes = {
  viewSingleProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  archiveProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth
})

export default connect(mapStateToProps, { viewSingleProject, archiveProject, deleteProject })(withRouter(ProjectDetail));