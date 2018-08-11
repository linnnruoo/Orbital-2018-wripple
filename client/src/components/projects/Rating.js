import React, { Component } from 'react';

import { loadRating } from '../../actions/reviewActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Rating extends Component {
    componentDidMount(){
        this.props.loadRating(this.props.userId);
    }

    render(){
        const { ratings } = this.props.review;

        return(
            <div>
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
            </div>
        )
    }
}

Rating.propTypes = {
  loadRating: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  review: state.review,
  auth: state.auth
})

export default connect(mapStateToProps, { loadRating })(Rating);