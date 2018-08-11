import React, { Component } from 'react';
import avatar from '../img/avatar.jpg';

class ProfileCard extends Component {
  render() {
    const { profile, user, ratings } = this.props;
    
    return (
      <div className="card shadow profile-card">
        <div className="card-body">
          <div className="text-center">
          <img src={avatar} alt="" className="detail-avatar mb-4" />
            <h5 className="font-weight-bold">{user.first_name} {user.last_name}</h5>
            <div>{user.university} {profile.major}</div>
            <div className="btn btn-primary btn-sm">{profile.specialization}</div>
            
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
              
            <button className="btn btn-light mt-2" onClick={this.props.editProfile}>Edit profile</button>
          </div>
        </div>
      </div>
    )
  }

}

export default ProfileCard;