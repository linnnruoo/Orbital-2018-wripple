import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { recentProjects } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RecentProject extends Component {
    componentDidMount(){
        this.props.recentProjects(this.props.userId);
    }

    render(){
        const { recent_project } = this.props;
        
        if (recent_project) {
            return(
                <div className="card-body">
                    <h5>Recent posts:</h5>
                    <div className="row">
                      {recent_project.map((item, index) => {
                        return (
                            <div className="col-4" key={index}>
                                <NavLink to={`/project_detail/${item._id}`} className="text-blue">{item.title}</NavLink>
                                <p className="text-truncate">{item.summary}</p>
                            </div>
                        )
                      })}
                    </div>
                </div>
            )
        } else {
            return(
                <div className="card-body">
                    <h5>Recent posts:</h5>
                    <p>No recent posts</p>
                </div>
            )
        }
        
    }
}

RecentProject.propTypes = {
    recentProjects:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  recent_project: state.project.recent_project,
  auth: state.auth,
  review: state.review
})

export default connect(mapStateToProps, { recentProjects })(RecentProject);