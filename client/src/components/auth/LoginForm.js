import React, { Component } from 'react';
import logo from '../img/wripple.png';
import '../css/login_form.css';

import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classnames from 'classnames';


// separate login form the user will be rediected to after the email is verified
class LoginForm extends Component {
    constructor() {
        super();
        this.state ={
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/myprofile');
        }
    }
    
    componentWillReceiveProps(nextProps) {
        //test if isAuthenticated is true
        if(nextProps.auth.isAuthenticated) {
            //redirect to profile page / dashboard page
            this.props.history.push('/myprofile');
        }
        
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const currUser = {
            email: this.state.email,
            password: this.state.password
        }

        //console.log(currUser);
        this.props.loginUser(currUser);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="text-center form-login">
                <form noValidate onSubmit={this.onSubmit} className="form-signin">
                    <img className="mb-4" src={ logo } alt="" width="114" height="100" />
                    <h1 className="h3 mb-3 font-weight-normal">Login here</h1>
                    
                    <input 
                        type="email"
                        value={this.state.email}
                        className={classnames('form-control', {'is-invalid': errors.email })}  
                        placeholder="Email address"
                        name="email"
                        onChange={this.onChange} 
                    />

                    <input 
                        type="password" 
                        className={classnames('form-control', {'is-invalid': errors.password })} 
                        value={this.state.password} 
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange} 
                    />

                    {errors.email && (<div className="invalid-feedback">{errors.email} {console.log(errors.email)}</div>)}
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}


                    <div className="help-block text-right"><a href="">Forgot your password?</a></div><br/>
                    <label><input type="checkbox" /> Keep me logged-in </label>
                    <button type="submit" className="btn btn-primary btn-block dropdown-btn">Sign in</button>
                     
                </form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(LoginForm);