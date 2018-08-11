import React, { Component } from 'react';
import '../css/review.css'

class ReviewItem extends Component {
  //HELP!!: change the color of the button after it is clicked

  onYayClick = () => {
    this.props.onRatingChange("good", this.props.index);
  }

  onMehClick = () => {
    this.props.onRatingChange("average", this.props.index);
  }

  onSadClick = () => {
    this.props.onRatingChange("bad", this.props.index);
  }
  
  render() {
    const { person, index } = this.props;

    return(  
      <div className="row card card-body m-4 users" key={index}>
        <div className="row">
          <div className="col-1">
            <img className="review-avatar float-left" src="https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-hacker-3830b32ad9e0802c-512x512.png" alt="" />
          </div>
          <div className="col-6">
            <h5>{person.first_name} {person.last_name}</h5>
          </div>

          <div className="col-5">
            <div className="btn-group float-right">
              <button type="button" className={`btn btn-light btn-yay btn-lg ${this.props.rating === "good" ? "active" : ""}`} onClick={this.onYayClick}><i className="far fa-smile"></i></button>
              <button type="button" className={`btn btn-light btn-meh btn-lg ${this.props.rating === "average" ? "active" : ""}`} onClick={this.onMehClick}><i className="far fa-meh"></i></button>
              <button type="button" className={`btn btn-light btn-sad btn-lg ${this.props.rating === "bad" ? "active" : ""}`} onClick={this.onSadClick}><i className="far fa-frown"></i></button>
            </div>
          </div>
        </div>

        <div className="row m-2">
          <p>In a few sentences, please describe your experience working with {person.first_name}.</p>
          <textarea
            type="text"
            className="form-control"
            row="2"
            name="summary"
            onChange={e => this.props.onSummaryChange(e, index)}
            value={this.props.summary}
          ></textarea>
        </div>
      </div>
    )
  }
}

export default ReviewItem;