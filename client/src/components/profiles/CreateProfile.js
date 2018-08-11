import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// edit profile
class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            major: '',
            about_me: '',
            skills: '',
            interests: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    } 

    render() {
        return (
            <div className="card shadow">
                <div className="card-body">
                    <div className="row m-2">
                        <div className="col-2">About me:</div>
                        <input 
                            className={classnames('form-control col-10', {'is-invalid': errors.about_me })}
                            type="text" 
                            name="about_me"
                            value={this.state.about_me}
                            onChange={this.onChange}  
                        />
                    </div>
                    <div className="row m-2">
                        <div className="col-2">My Skills:</div>
                        <input 
                            className={classnames('form-control col-10', {'is-invalid': errors.skills })}
                            type="text" 
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}  
                        />
                    </div>
                    <div className="row m-2">
                        <div className="col-2">My Interests:</div>
                        <input 
                            className={classnames('form-control col-10', {'is-invalid': errors.skills })}
                            type="text" 
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}  
                        />
                    </div>
                    <div className="row m-2">
                        <div className="col-2">Major:</div>
                        <input 
                            className={classnames('form-control col-10', {'is-invalid': errors.major })}
                            type="text" 
                            name="major"
                            value={this.state.major}
                            onChange={this.onChange}  
                        />
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(null)(CreateProfile);