import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ProjectItemList extends Component {
    render(){
        const { item } = this.props;
        return(
            <li className="list-group-item">
                <NavLink to={`/project_detail/${item._id}`}>
                <h5 className="card-title">{item.title}</h5>
                </NavLink>
                <h6 className="card-subtitle text-muted">{item.subtitle}</h6> 
            </li>
        );
    }
}

export default ProjectItemList;