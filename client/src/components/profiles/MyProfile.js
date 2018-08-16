import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import ProfileFeedbackCard from './ProfileFeedbackCard';
import ProfileAbout from './ProfileAbout';
import ProfileEdit from './ProfileEdit';
import '../css/profile.css'
import '../css/loading.css'
 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile, editMyProfile, createProfile } from '../../actions/profileActions';
import { loadRating, loadReview } from '../../actions/reviewActions';

class MyProfile extends Component {
	constructor() {
		super();

		this.state = {
			edit_profile: false
		}
	}

	componentDidMount() {
		this.props.createProfile();
		this.props.getMyProfile();
		this.props.loadRating(this.props.auth.user.id);
		this.props.loadReview(this.props.auth.user.id);
	}

	editProfile = () => {
		this.setState({
			edit_profile: true
		})
	}

	saveChanges = () => {
		this.setState({
			edit_profile: false
		})
	}

    render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		const { ratings, reviews } = this.props.review;

		let profileAbout, profileCard, profileEdit, profileFeedback, spinner;

		if(profile === null || loading) {
			spinner = <div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div>
		} else {
			profileCard = <ProfileCard profile = {profile} user = {user} ratings={ratings} editProfile = {this.editProfile} />;
			profileAbout = <ProfileAbout profile = {profile} />;
			profileEdit = <ProfileEdit profile = {profile} saveChanges = {this.saveChanges} />;
			profileFeedback = <ProfileFeedbackCard reviews = {reviews} /> 
		}

		return (
			<div className="container profile-container">
				<div className="grid">
        		{spinner}
				<div className="row">
					<div className="col-lg-3">
						<div className="mb-4">{profileCard}</div>
						<div className="mb-4">{profileFeedback}</div>
					</div>
					<div className="col-lg-9 ">
					{
						this.state.edit_profile ? <div>{profileEdit}</div> : <div>{profileAbout}</div>
					}
					</div>
				</div>
				</div>
			</div>
		);
  	}
}

MyProfile.propTypes = {
	getMyProfile: PropTypes.func.isRequired,
	loadRating: PropTypes.func.isRequired,
	loadReview: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	review: state.review,
	auth: state.auth
});

export default connect(mapStateToProps, { getMyProfile, editMyProfile, createProfile, loadRating, loadReview })(MyProfile);