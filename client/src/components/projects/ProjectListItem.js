import React, { Component } from 'react';
import '../css/project.css';
import { NavLink } from 'react-router-dom';
import avatar from '../img/avatar.jpg';


class ProjectListItem extends Component {

  render() {
    const { item } = this.props;
    const timestampOptions = {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    return (
      <div className="card shadow mb-2">
        <div className="card-body">
          <h5 className="card-title">
            <NavLink to={`/project_detail/${item._id}`} className="text-blue">{item.title}</NavLink>
            <span className="post-time text-dark">{new Date(item.date).toLocaleString('en-SG', timestampOptions)}</span>
          </h5>
          <h6 className="card-subtitle text-muted mb-4">{item.subtitle}</h6>
          <p className="text-truncate">{item.summary}</p>
          <hr />
          <div className="row">
            <div className="col-4">
              <div className="btm-headings">POSTED BY:</div>
              <NavLink to={`/profiles/${item.user}`} className="mt-2 btn btn-light shadow-sm text-left">
                <img src={avatar}
                  className="avatar mr-2"
                  alt={item.first_name} />
                <div className="namecard">
                  <span className="name">{item.first_name} {item.last_name}</span>
                  <br />
                  <span className="school">{item.university}</span>
                </div>
              </NavLink>
            </div>

            <div className="col-8">
              <div className="btm-headings">LOOKING FOR: </div>
              <div className="mb-2">
                {item.looking_for.map((job, index) => {
                  return <div className="btn btn-light btn-sm mr-2 shadow-sm mb-2" key={index}>{job}</div>
                })}
              </div>
              <div className="mb-2">
                <span className="btm-headings">COMMITMENT LEVEL: </span>
                <span className="btn btn-light btn-sm shadow-sm">{item.commitment_lvl}</span>
              </div>

              <div>
                <span className="btm-headings">TEAM SIZE:</span>
                <span className="btn btn-light btn-sm shadow-sm">{item.team_size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectListItem;