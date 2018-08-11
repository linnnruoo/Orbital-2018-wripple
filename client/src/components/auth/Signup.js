import React, { Component } from 'react';
import '../css/signup.css';
import classnames from 'classnames';
import { connect } from 'react-redux'; // connect redux to this component
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            university: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/myprofile');
       }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                // get errors from redux state and put into props and map state to props.
                //When we receive new properties, this will be set to component state
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            university: this.state.university,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }

        //console.log(newUser);

        this.props.registerUser(newUser, this.props.history);
        
    }

    render() {

        //poll errors out from the state
        const { errors } = this.state;
        
        return (
            <div className="container py-5 px-5">
                <form onSubmit={this.onSubmit} className="card mx-5 px-5 my-5 py-5 card-signup">
                    <div className="container px-5 py-3">
                        <h1>Sign Up</h1>
                        <hr/>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col">
                                    <label><b>First Name:</b></label>
                                    <input  
                                        className={classnames('form-control', {'is-invalid': errors.last_name })}  
                                        type="text" 
                                        name="first_name" 
                                        value={this.state.first_name}
                                        onChange={this.onChange} 
                                    />
                                    {errors.first_name && (<div className="invalid-feedback">{errors.first_name}</div>)}
                                </div>
                                <div className="col">
                                    <label><b>Last Name:</b></label>
                                    <input  
                                        className={classnames('form-control', {'is-invalid': errors.last_name })}  
                                        type="text" 
                                        name="last_name" 
                                        value={this.state.last_name}
                                        onChange={this.onChange} 
                                    />
                                    {errors.last_name && (<div className="invalid-feedback">{errors.last_name}</div>)}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label><b>University:</b></label>
                            <input  
                                className={classnames('form-control', {'is-invalid': errors.university })}
                                type="text" 
                                name="university" 
                                value={this.state.university}
                                onChange={this.onChange} 
                            />
                            {errors.university && (<div className="invalid-feedback">{errors.university}</div>)}
                        </div>

                        <div className="mb-3">
                            <label><b>Email:</b></label>
                            <input 
                               className={classnames('form-control', {'is-invalid': errors.email })}
                                type="text" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.onChange} 
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>

                        <div className="mb-3">
                            <label><b>Password:</b></label>
                            <input  
                                className={classnames('form-control', {'is-invalid': errors.password })}
                                type="password" 
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange} 
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        
                        <div className="mb-3">
                            <label><b>Confirm Password:</b></label>
                            <input  
                                className={classnames('form-control', {'is-invalid': errors.password2 })}
                                type="password" 
                                name="password2"
                                value={this.state.password2}
                                onChange={this.onChange}  
                            />
                            {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                        </div>

                        <hr/>            
                        <p><input 
                            type="checkbox" 
                            name="terms"
                            style={{marginBottom:'15px'}}
                            id="check-box"
                            required
                        /> I have read and agreed with the <a href="www.google.com">Terms & Conditions</a>.</p>


                        <div className="clearfix">
                            <input type="submit" className="btn btn-primary btn-block submit-btn" />
                        </div>
                    </div>
                </form>
            
                
            </div>
        );
    }
}

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
// object that map the action
export default connect(mapStateToProps, { registerUser })(withRouter(Signup));