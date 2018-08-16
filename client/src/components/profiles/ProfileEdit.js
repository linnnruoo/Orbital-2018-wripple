import React, { Component } from 'react';

import { connect } from 'react-redux';
import { editMyProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about_me: this.props.profile.about_me,
      interests: this.props.profile.interests,
      skills: this.props.profile.skills,
      specialization: this.props.profile.specialization,
      major: this.props.profile.major,
      newSkill: '',
      newInterest: '',
    }

    this.submitChanges = this.submitChanges.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.addNewSkill = this.addNewSkill.bind(this);
    this.addNewInterest = this.addNewInterest.bind(this);
    this.onNewSkillFieldChange = this.onNewSkillFieldChange.bind(this);
    this.onNewInterestFieldChange = this.onNewInterestFieldChange.bind(this);
  }

  submitChanges(e) {
    e.preventDefault();

    const updateProfile = {
      about_me: this.state.about_me,
      interests: this.state.interests,
      skills: this.state.skills,
      specialization: this.state.specialization,
      major: this.state.major
    }

    this.props.editMyProfile(updateProfile);
    console.log(updateProfile);
  }

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onTextareaChange = e => {
    this.setState({
      about_me: e.target.value
    })
  }

  addNewSkill = e => {
    e.preventDefault();
    // makesure no empty skill is saved
    if (this.state.newSkill.length > 0) {
      this.setState({
        skills: [...this.state.skills, this.state.newSkill],
        newSkill: ''
      })
    }
  }

  onNewSkillFieldChange = e => {
    this.setState({ newSkill: e.target.value })
  }

  addNewInterest = e => {
    e.preventDefault();
    // makesure no empty interest is entered
    if (this.state.newInterest.length>0) {
      this.setState({
        interests: [...this.state.interests, this.state.newInterest],
        newInterest: ''
      })
    }
  }

  onNewInterestFieldChange = e => {
    this.setState({ newInterest: e.target.value })
  }

  deleteSkill(index) {
    let newSkills = this.state.skills;
    newSkills.splice(index, 1);
    this.setState({
      skills: newSkills
    })
  }

  deleteInterest(index) {
    let newInterests = this.state.interests;
    newInterests.splice(index, 1);
    this.setState({
      interests: newInterests
    })
  }


  render() {

    return (
      <form>
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title text-blue mb-4">Edit Profile</h4>
            <div className="row m-2">
              <div className="col-lg-3 col-xs-6 col-sm-6 col-md-3">About me:</div>
              <div className="col-lg-9 col-xs-6 col-sm-6 col-md-9 text-justify form-group">
                <textarea
                  className="form-control"
                  id="about"
                  rows="5"
                  value={this.state.about_me}
                  onChange={this.onTextareaChange}>
                </textarea>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-lg-3 col-xs-6 col-sm-6 col-md-3">My skills:</div>
              <div className="col-lg-9 col-xs-6 col-sm-6 col-md-9">
                <form className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add new skill"
                    value={this.state.newSkill}
                    onChange={this.onNewSkillFieldChange}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-secondary" onClick={this.addNewSkill}>Add</button>
                  </div>
                </form>
                {this.state.skills.map((item, index) => {
                  return <div key={index}>
                    <button type="button" className="btn btn-link btn-sm" onClick={() => this.deleteSkill(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                    {item}
                  </div>
                })}
              </div>
            </div>
            <div className="row m-2">
              <div className="col-lg-3 col-xs-6 col-sm-6 col-md-3">My interests:</div>
              <div className="col-lg-9 col-xs-6 col-sm-6 col-md-9">
                <form className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add new interest"
                    value={this.state.newInterest}
                    onChange={this.onNewInterestFieldChange}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-secondary" onClick={this.addNewInterest}>Add</button>
                  </div>
                </form>
                {this.state.interests.map((item, index) => {
                  return <div key={index}>
                    <button type="button" className="btn btn-link btn-sm" onClick={() => this.deleteInterest(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                    {item}
                  </div>
                })}
              </div>
            </div>
            <div className="row m-2">
              <div className="col-lg-3 col-xs-6 col-md-3">Major:</div>
              <div className="col-lg-9 col-xs-6 col-md-9">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="major"
                    value={this.state.major}
                    onChange={this.onTextChange}
                  />
                </div>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-lg-3 col-xs-6 col-md-3">Specialization:</div>
              <div className="col-lg-9 col-xs-6 col-md-9">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="specialization"
                    value={this.state.specialization}
                    onChange={this.onTextChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success" onClick={(e) => {
              this.submitChanges(e);
              this.props.saveChanges();
            }}>Save changes</button>
          </div>
        </div>
      </form>
    );
  }
}

ProfileEdit.propTypes = {
  editMyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  //errors: state.errors
})
export default connect(mapStateToProps, { editMyProfile })(ProfileEdit);