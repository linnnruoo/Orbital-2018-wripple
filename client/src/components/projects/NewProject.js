import React, { Component } from 'react';

import { connect } from 'react-redux'; 
import { createNewproject } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class NewProject extends Component {

  constructor() {
    super();

    this.state = {
      title: '',
      subtitle: '',
      summary: '',
      details: '',
      team_size: '',
      commitment_lvl: '',
      looking_for: [],
      submitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onCheckboxChange = (new_looking_for) => {
    this.setState({
      looking_for: new_looking_for
    })
  }

  onSubmit = e => {
    e.preventDefault();
    
    const { user } = this.props.auth;

    const newProject = {
      first_name: user.first_name,
      last_name: user.last_name,
      university: user.university,
      title: this.state.title,
      subtitle: this.state.subtitle,
      summary: this.state.summary,
      details: this.state.details,
      looking_for: this.state.looking_for,
      team_size: this.state.team_size,
      commitment_lvl: this.state.commitment_lvl
    }
    
    alert("Creating new project...");
    
    this.props.createNewproject(newProject, this.props.history);
    console.log(newProject);
    this.setState({
      title: '',
      subtitle: '',
      summary: '',
      details: '',
      team_size: '',
      commitment_lvl: '',
      looking_for: [],
      submitted: true
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="container project-container">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title text-primary mb-4">Create new project</h4>
            <div className="grid">

              <div className="row mb-4">
                <div className="col-2">
                  <div className="card-title">Project Title *</div>
                </div>
                <div className="col-10">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      name="title"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-2">
                  <div className="card-title">Project Subtitle</div>
                </div>
                <div className="col-10">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.subtitle}
                      name="subtitle"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-2">
                  <div className="card-title">Project Summary *</div>
                </div>
                <div className="col-10">
                  <textarea 
                      type="text" 
                      className="form-control"
                      row="2" 
                      value={this.state.summary}
                      name="summary"
                      onChange={this.onChange}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-2">
                  <div className="card-title">Project Details *</div>
                </div>
                <div className="col-10">
                  <textarea 
                    className="form-control" 
                    rows="5"
                    value={this.state.details}
                    name="details"
                    onChange={this.onChange} 
                  ></textarea>

                  <div className="row mt-4">
                    <div className="col-4">
                      Looking for:
                      <CheckboxGroup
                        checkboxDepth={2}
                        name="looking_for"
                        value={this.state.value}
                        onChange={this.onCheckboxChange}
                      >
                        <label><Checkbox value="Entrepreneur"/> Entrepreneur</label><br/>
                        <label><Checkbox value="Programmer"/> Programmer</label><br/>
                        <label><Checkbox value="Engineer"/> Engineer</label><br/>
                        <label><Checkbox value="Creative Designer"/> Creative Designer</label><br/>
                        <label><Checkbox value="Photographer"/> Photographer</label><br/>
                        <label><Checkbox value="Videographer"/> Videographer</label>
                      </CheckboxGroup>
                    </div>

                    <div className="col-4">
                      Commitment level:
                      <select 
                        className="custom-select"
                        name="commitment_lvl"
                        value={this.state.commitment_lvl}
                        onChange={this.onChange}
                      >
                        <option selected>Select commitment level</option>
                        {
                          ['Short-term', 'Medium-term', 'Long-term'].map((term, index) => {
                            return <option value={term} key={index}>{term}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-4">
                      Team size:
                      <select 
                        className="custom-select"
                        name="team_size"
                        value={this.state.team_size}
                        onChange={this.onChange}
                      >
                        <option selected>Select team size</option>
                        {
                          ['1-5', '6-10', '10+'].map((term, index) => {
                            return <option value={term} key={index}>{term}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <input type="submit" className="btn btn-success mx-auto" value="Create New Project" />
              </div>

            </div>
          </div>
        </div>
      </form>
    )
  }
}

NewProject.propTypes = {
  createNewproject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { createNewproject })(withRouter(NewProject));