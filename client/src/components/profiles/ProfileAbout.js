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
            <div className="col-2">About me:</div>
            <div className="col-10 text-justify">{profile.about_me}</div>
          </div>
          <div className="row m-2">
            <div className="col-2">My skills:</div>
            <div className="col-10">
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
            <div className="col-2">My interests:</div>
            <div className="col-10">
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