import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArchiveItemList extends Component {
    render(){
        const { item } = this.props;

        return(
            <li className="list-group-item">
                <div className="row">
                    <div className="col-9">
                        <h5 className="card-title">
                            <NavLink to={`/project_detail/${item._id}`} style={{ textDecoration: 'none' }}>{item.title}</NavLink>
                        </h5>
                        <h6 className="card-subtitle text-muted">{item.subtitle}</h6> 
                    </div>

                    <div className="col-3">
                        <div className="float-right">
                        <NavLink to={`/review/${item._id}`} style={{ textDecoration: 'none' }}>
                            <button type="button" className="btn btn-info mr-4">Review</button>
                        </NavLink>
                        </div>
                    </div>

                </div>
            </li>
        );
    }
}

export default ArchiveItemList;