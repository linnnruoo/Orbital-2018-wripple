import React, { Component } from 'react';

import { connect } from 'react-redux';
import { sendFeedback } from '../../actions/contactActions';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            service: '--',
            message: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

	onChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
    }
    
    onSubmit = (e) => {
        e.preventDefault(); 
        
        const feedback = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            service: this.state.service,
            message: this.state.message
        }

        console.log(feedback);
        this.props.sendFeedback(feedback);

        alert("Submitted!");

        this.setState({
			name: '',
            email: '',
            phone: '',
            service: '--',
            message: '',
		})
    }

    render() {
    return (
      <div>
            <form onSubmit={this.onSubmit}>
                <div className="my-3">
                    <label className="input-group">Full Name *</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.onChange}    
                    />
                </div>

                <div className="mb-3">
                    <label className="input-group">Email *</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange}    
                    />
                </div>

                <div className="mb-3">
                    <label className="input-group">Phone</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="phone" 
                        value={this.state.phone}
                        onChange={this.onChange}    
                    />
                </div>

                <div className="mb-3">
                    <label className="input-group">Required Services *</label>
                    <div>
                        <select 
                            className="form-control" 
                            name="service"
                            value={this.state.service}
                            onChange={this.onChange}
                        >
                            <option value="--">--</option>
                            <option value="Report Bugs">Report Bugs</option>
                            <option value="UI/UX">UI/UX Design</option>
                            <option value="Project-related">Project-related</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 message">
                    <span className="mb-3">Message *</span>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        name="message" 
                        placeholder="Please describe here"
                        value={this.state.message}
                        onChange={this.onChange}
                    ></textarea>
                </div>

                <hr className="mb-4" />
                <input type="submit" value="Submit" className="btn btn-primary btn-lg btn-block submit-btn" /> 
            </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
	sendFeedback: PropTypes.func.isRequired,
	contact: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	contact: state.contact
})

export default connect(mapStateToProps, { sendFeedback })(ContactForm);
