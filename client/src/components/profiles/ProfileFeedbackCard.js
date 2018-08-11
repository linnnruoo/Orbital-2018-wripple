import React, { Component } from 'react';
import avatar from '../img/avatar.jpg';

class ProfileFeedbackCard extends Component{
  render() {
    const { reviews } = this.props;

    return (
      <div className="card shadow profile-card">
        <h5 className="card-header text-blue">Past feedback</h5>
      <div className="card-body">
        {reviews && reviews.length>0 ? (
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
    )
  }
}

export default ProfileFeedbackCard;