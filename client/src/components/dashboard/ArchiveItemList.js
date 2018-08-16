import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ArchiveItemList extends Component {
    render(){
        const { item } = this.props;

        return(
            <li className="list-group-item">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-8 col-sm-6">
                        <h5 className="card-title">
                            <NavLink to={`/project_detail/${item._id}`} style={{ textDecoration: 'none' }}>{item.title}</NavLink>
                        </h5>
                        <h6 className="card-subtitle text-muted mb-2">{item.subtitle}</h6> 
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-4 col-sm-6">
                        <div className="">
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