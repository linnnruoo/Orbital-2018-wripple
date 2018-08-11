import React, { Component } from 'react'

import { connect } from 'react-redux'; 
import { applyProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class ProjectApply extends Component {

  constructor(props) {
    super(props)
    this.state = {
      applied: false,
      role: "",
      message: ""
    }
  }

  closeModal = () => {
    this.props.closeModal()
  }

  confirmApply = () => {

    const { user } = this.props.auth;

    const newRequest = {
      first_name: user.first_name,
      last_name: user.last_name,
      owner: this.props.projectDetails.user,
      project_title: this.props.projectDetails.title,
      project_id: this.props.projectDetails._id,
      role: this.state.role,
      message: this.state.message
    };

    console.log(newRequest);
    this.props.applyProject(newRequest);
    this.setState({ applied: true })

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {

    const confirmation = <div className="confimation">
      <div className="modal-body">
        <p>Select the role you wish to apply for:</p>
        <select
          className="custom-select"
          name="role"
          value={this.state.role}
          onChange={this.onChange}
        >
          {
            this.props.projectDetails.looking_for.map((term, index) => {
              return <option value={term} key={index}>{term}</option>
            })
          }
        </select>
          <p className="mt-4">Send a short message saying why we should choose you:</p>
        <textarea
          type="text"
          className="form-control"
          row="2"
          value={this.state.message}
          name="message"
          onChange={this.onChange}
        ></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={this.confirmApply}>Submit application</button>
      </div>
    </div>

    const confirmed = <div className="confirmed">
      <div className="modal-body">
        <p>Successfully applied! Please wait for confirmation.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-light" onClick={this.closeModal}>Close</button>
      </div>
    </div>

    return (
      <div className="ProjectApply">
        <div className="modal fade show" tabIndex="-1" style={this.props.showModal ? { display: 'block' } : { display: 'none' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-capitalize text-truncate">{this.props.projectDetails.title}</h5>
                <button type="button" className="close" onClick={this.closeModal}>
                  <span>&times;</span>
                </button>
              </div>

              {this.state.applied ? confirmed : confirmation}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectApply.propTypes = {
  applyProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { applyProject })(ProjectApply);