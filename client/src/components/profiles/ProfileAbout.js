import React, { Component } from 'react';

class ProfileAbout extends Component {
  render () {
    const { profile } = this.props;

    return (
      <div className="card shadow">
        <h5 className="card-header text-blue">
          My Profile
        </h5>
        <div className="card-body">
          <div className="row m-2">
            <div className="col-lg-3 col-sm-4 col-md-3 col-xs-6">About me:</div>
            <div className="col-lg-9 col-sm-8 col-md-9 col-xs-6 text-justify">{profile.about_me}</div>
          </div>
          <div className="row m-2">
            <div className="col-lg-3 col-sm-4 col-md-3 col-xs-6">My skills:</div>
            <div className="col-lg-9 col-sm-8 col-md-9 col-xs-6">
              <ul>
                {
                  profile.skills? 
                    profile.skills.map((item, index) => {
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
                  profile.interests ?
                    profile.interests.map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                  : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }       
}

export default ProfileAbout;