import React, { Component } from 'react';
//import ProfileFeedbackCard from './ProfileFeedbackCard';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewProfile } from '../../actions/profileActions';
import { loadRating, loadReview } from '../../actions/reviewActions';

import avatar from '../img/avatar.jpg';

class Profiles extends Component {
  
  componentDidMount() {
    this.props.viewProfile(this.props.match.params.userId);
    this.props.loadRating(this.props.match.params.userId);
    this.props.loadReview(this.props.match.params.userId);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { ratings, reviews } = this.props.review;

    if (profiles === null || loading) {
      return <div className="profile-container"><div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div></div>
    } else {
      return (
        <div className="container profile-container">
          <div className="grid">
            <div className="row">
              
              <div className="col-lg-3">
                
                <div className="mb-4">
                  <div className="card shadow profile-card">
                    <div className="card-body">
                      <div className="text-center">
                        <img src={avatar} alt="" className="detail-avatar mb-4" />
                        <h5>{profiles.user.first_name} {profiles.user.last_name}</h5>
                        <div>{profiles.user.university} {profiles.major}</div>
                        <div className="btn btn-primary btn-sm">{profiles.specialization}</div>
                      
                        {ratings ? (
                          <div className="row mt-4 mb-4">  
                            <div className="col">{ratings.good.length}
                              <i className="far fa-smile ml-2"></i>
                            </div>
                            <div className="col">{ratings.average.length}
                              <i className="far fa-meh ml-2"></i>
                            </div>
                            <div className="col">{ratings.bad.length}
                              <i className="far fa-frown ml-2"></i>
                            </div>
                          </div>
                        ) : (
                          <div className="row mt-4 mb-4">
                            <div className="col">0
                              <i className="far fa-smile ml-2"></i>
                            </div>
                            <div className="col">0
                              <i className="far fa-meh ml-2"></i>
                            </div>
                            <div className="col">0
                              <i className="far fa-frown ml-2"></i>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card shadow profile-card mb-4">
                  <div className="card-body">
                    <h5 className="card-title text-blue mb-4">Past feedback</h5>
                    {reviews && reviews.length > 0 ? (
                      reviews.map((item, index) => {
                        return <div className="row ml-1 mr-1 mb-4" key={index}>
                          <img src={avatar} alt="" className="avatar-feedback mt-2" />
                          <div className="col">
                            <div className="feedback-name">{item.first_name} {item.last_name}</div>
                            <div className="feedback-comment">"{item.review}"</div>
                          </div>
                        </div>
                      })
                    ) : (
                      <p className="text-muted">No feedback currently</p>
                    )}
                    
                  </div>
                </div>

              </div>

              <div className="col-lg-9 mb-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title text-blue mb-4">{profiles.user.first_name}'s Profile</h4>
                    <div className="row m-2">
                      <div className="col-lg-3 col-sm-4 col-md-3 col-xs-6">About me:</div>
                      <div className="col-lg-9 col-sm-8 col-md-9 col-xs-6 text-justify">{profiles.about_me}</div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-3 col-sm-4 col-md-3 col-xs-6">My skills:</div>
                      <div className="col-lg-9 col-sm-8 col-md-9 col-xs-6">
                        <ul>
                          {
                            profiles.skills ?
                              profiles.skills.map((item, index) => {
                                return <li key={index}>{item}</li>
                              })
                              : null
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-3 col-sm-4 col-md-3 col-xs-6">My interests:</div>
                      <div className="col-lg-9 col-sm-8 col-md-9 col-xs-6">
                        <ul>
                          {
                            profiles.interests ?
                              profiles.interests.map((item, index) => {
                                return <li key={index}>{item}</li>
                              })
                              : null
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
Profiles.propTypes = {
  viewProfile: PropTypes.func.isRequired,
  loadRating: PropTypes.func.isRequired,
  loadReview: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  review: state.review,
  auth: state.auth
});
export default connect(mapStateToProps, { viewProfile, loadRating, loadReview })(Profiles);