import React, { Component } from 'react';
import '../css/review.css'
import ReviewItem from './ReviewItem';

import { connect } from 'react-redux'; 
import { viewSingleProject } from '../../actions/projectActions';
import { sendReview } from '../../actions/reviewActions';
import PropTypes from 'prop-types';

class Review extends Component {
  constructor(props){
    super(props);

    this.state = {
      rating: [],
      summary: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onSummaryChange = this.onSummaryChange.bind(this);
  }

  // change the text in summary and not very efficient
  onSummaryChange = (e, index) => {
    const new_summary = this.state.summary.slice();
    new_summary[index] = e.target.value;

    this.setState({
      summary: new_summary
    })
  }

  // change the rating 
  onRatingChange = (rating, index) => {
    const new_rating = this.state.rating.slice();
    new_rating[index] = rating;

    this.setState({
      rating: new_rating
    })
  }

  // submit the review form
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;

    const newReview = {
      project_id: this.props.match.params.projectId,
      first_name: user.first_name,
      last_name: user.last_name,
      target_users: this.props.project.single_project.collaborators,
      reviews: this.state.summary,
      ratings: this.state.rating,

    }

    this.props.sendReview(newReview);
    alert("sent");
  }


  componentDidMount() {
    this.props.viewSingleProject(this.props.match.params.projectId);
  }

  
  render() {

    const { single_project, loading } = this.props.project;

    if (single_project === null || loading) {
      return <div className="project-container"><div className="mx-auto text-center"><h4>Loading...</h4><div className="lds-ripple"><div></div><div></div></div></div></div>
    } else if (single_project.isReviewed) {
      return (
        <div className="container review-container">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-primary mb-4">{single_project.title}</h4>
              <p>You have given the reviews for this project</p>
            </div>
          </div>
        </div>
      )
    } else {  
      return (
        <div className="Review">
          <div className="container review-container">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="card-title text-primary mb-4">{single_project.title}</h4>
                <p>Please leave reviews for your fellow collaborators:</p>
                <div className="grid">
                  { single_project.collaborators.length>0 ?
                      single_project.collaborators.map((person, index) => {
                        return (
                          <ReviewItem 
                            index={index} 
                            person={person}
                            rating={this.state.rating[index]}
                            summary={this.state.summary[index]} 
                            onRatingChange={this.onRatingChange} 
                            onSummaryChange={this.onSummaryChange} 
                          />
                        )
                      }) : <div className="text-muted">No collaborators involved in this project. You can't give any reviews.</div>
                    }

                  <div className="row">
                    <div className="col text-center">
                      { single_project.collaborators.length>0 ?
                        <button className="btn btn-success" onClick={this.onSubmit}>Submit review</button>
                        : null
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) // end return
    } // end if / else
  }
}

Review.propTypes = {
  viewSingleProject: PropTypes.func.isRequired,
  sendReview: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  errors: state.errors
})

export default connect(mapStateToProps, { viewSingleProject, sendReview } )(Review);