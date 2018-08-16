import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux'; 
import { acceptRequest } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class RequestItemList extends Component {
    constructor(){
        super();

        this.state = {
            viewed: false,
            decision: ''
        }

        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRejectClick = this.onRejectClick.bind(this);
    }

    onAcceptClick = (e) => {
        const decision = {choice: "1"};

        this.props.acceptRequest(this.props.item._id, decision);
        this.setState({
            viewed: true,
            decision: 1
        })
    }

    onRejectClick = (e) => {
        const decision = {choice: "2"};

        this.props.acceptRequest(this.props.item._id, decision);
        this.setState({
            viewed: true,
            decision: 2
        })
    }

    render() {
        const { item } = this.props;

        return (
            <li className="list-group-item">
                <div className="row">
                <div className="col-lg-9">
                    <h5 className="card-title">
                    <NavLink to={`/profiles/${item.user}`} style={{ textDecoration: 'none' }}>{item.first_name} {item.last_name}</NavLink>
                    </h5>
                    <h6 className="card-subtitle">
                    <NavLink to={`/project_detail/${item.project_id}`} className="text-muted">
                        <strong>{item.project_title} - {item.role}</strong>
                    </NavLink>
                    </h6>
                    <h6 className="card-subtitle text-muted mt-2 mb-2">{item.message}</h6>
                </div>

                <div className="col-lg-3">
                    {this.state.viewed ? 
                        (
                            <div className="float-right">
                                {this.state.decision===1 ? <h6>You have accepted this request</h6> : <h6>You have rejected this request</h6>}
                            </div>
                        ) : 
                        (
                            <div className="">
                            <button 
                                type="button" 
                                className="btn btn-success mr-4 btn-lg"
                                onClick={this.onAcceptClick}
                            ><i className="fas fa-check-circle"></i></button>

                            <button 
                                type="button" 
                                className="btn btn-danger btn-lg"
                                onClick={this.onRejectClick}
                                alt="Reject request"
                            ><i className="fas fa-times-circle"></i></button>
                            </div>
                        )
                    }
                    
                </div>
                </div>
            </li>
        );
    }
}

RequestItemList.propTypes = {
    acceptRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { acceptRequest })(RequestItemList);